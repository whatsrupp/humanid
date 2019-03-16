import React from 'react'
import {  ListItem, Icon, Text, View } from 'native-base';

const DateField = () => {
    return (
        <ListItem>
            <View style={{flex:1}}>
                <Icon active type='FontAwesome' name='calendar' />
            </View>
            <Text>{new Date().toLocaleDateString()}</Text>
        </ListItem>
    )
}

export default DateField