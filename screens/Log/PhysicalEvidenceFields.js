import React, {Component}from 'react'

import { Button, Container, ListItem, Input, Item, Header, Separator, Content, Title, Right, Body, Form, Icon, Text } from 'native-base';
import {Field } from 'formik'

export default class PhysicalEvidenceFields extends Component {
    

    renderRows = () => {
       const fieldArrayName = this.props.name
       const entries = this.props.form.values[fieldArrayName]
        if (!entries) return null

       return entries.map((entry, index)=>{
           const fieldName = `${fieldArrayName}.${index}`
            return(
                <Item key={index}>
                <Input 
                placeholder='Add Physical Evidence ...'
                value={entries[index]}
                onChangeText={this.props.form.handleChange(fieldName)}
                />
              </Item>
            )
       })
    }


    handleAddNewRow = ()=>{
        this.props.push('') 
    }
    render = () => {
        const {values} = this.props
        
        return(
            <>
                {this.renderRows()}
                <Button transparent primary full onPress={this.handleAddNewRow}><Text>+</Text></Button>
            </>
        )


        
    }
}