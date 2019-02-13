import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import EmployeeForm from './EmployeeForm'
import { Card,Button,CardSection } from './common';
import { text } from 'react-native-communications'
import { connect } from 'react-redux'
import { employeeUpdate, employeeSave, employeeDelete } from '../actions'
import { map } from '@firebase/util';

class EmployeeEdit extends Component {
    static navigationOptions = {
        drawerLabel: () => null
    };

    onButtonPress = () => {
        const { name,phone,shift,uid } = this.props;

        this.props.employeeSave(name,phone,shift,uid);
    }

    onButtonFirePress = () => {
        Alert.alert(
            'Are you sure to fire him/her?',
        'ngerti inggris ga?',
        [
            {text: 'NO', onPress: () => {}, style: 'CANCEL' },
            {text: 'YES', onPress: this.onAccept },
        ],
        { cancelable: false}
        )
    }

    onAccept = () => {
        this.props.employeeDelete(this.props.uid);
    }

    onButtonTextPress = () => {
        const { phone,shift } = this.props;

        text(phone, `your upcoming shift is on ${shift}`)
    }

    render() {
        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={{ 
                        icon: 'menu', 
                        color: '#fff', 
                        onPress: () => this.props.navigation.toggleDrawer() 
                    }}
                    centerComponent={{ text: 'Edit Employee', style: { color: '#fff' } }}
                    rightComponent={{ 
                        icon: 'home', 
                        color: '#fff', 
                        onPress: () => this.props.navigation.navigate('EmployeeList')
                    }}
                />
                <EmployeeForm/>

                <CardSection>
                    <Button onPress={this.onButtonPress}>
                        save
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonTextPress}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonFirePress}>
                        Fire
                    </Button>
                </CardSection>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift, uid } = state.employeeForm;

    return { name, phone,shift, uid };
};

export default connect (
    mapStateToProps,
     { employeeSave, employeeDelete }
)(EmployeeEdit);
