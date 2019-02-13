import React, { Component } from 'react'
import { Text,View,TouchableWithoutFeedback } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { CardSection } from './common'
import { employeeUpdate } from '../actions'

class EmployeeListItem extends Component {
    onRowPress = () => {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate(prop, value);
        });
        this.props.navigation.navigate('EditEmployee')
    }

    render() {
        const { name } = this.props.employee;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress}>
                <View>
                 <CardSection>
                     <Text style={styles.nameSyle}>
                        {name}
                     </Text>
                 </CardSection>
             </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    nameSyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default connect(null, {employeeUpdate}) (EmployeeListItem);