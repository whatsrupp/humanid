import React, {Component}from 'react'
import {TouchableOpacity} from 'react-native'
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
                <TouchableOpacity onPress={()=>this.removeRow(index)}>
                <Icon active type='FontAwesome' name='trash' />
                </TouchableOpacity>
                <Input 
                ref={(node)=>{this[fieldName] = node}}
                placeholder='Add Physical Evidence ...'
                value={entries[index]}
                onChangeText={this.props.form.handleChange(fieldName)}
                />
              </Item>
            )
       })
    }

    removeRow = (index) => {
        this.props.remove(index)
    }

    focusLatestField = ()=>{
        const fieldArrayName = this.props.name
        const values = this.props.form.values[fieldArrayName]
        const index = values.length - 1
        const lastFieldName = `${fieldArrayName}.${index}`
        const fieldRef = this
        [lastFieldName]
        fieldRef._root.focus()
        // console.log(fieldRef)
    } 

    handleAddNewRow = async ()=>{
        await this.props.push('') 
        this.focusLatestField()
    }
    render = () => {
        const {values} = this.props
        
        return(
            <>
            <Item onPress={this.handleAddNewRow}>
            <TouchableOpacity>
                <Button transparent primary full onPress={this.handleAddNewRow} ><Text>Add more evidence</Text></Button>
            </TouchableOpacity>
            </Item>
                {this.renderRows()}
            </>
        )


        
    }
}