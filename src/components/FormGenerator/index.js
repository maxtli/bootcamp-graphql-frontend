import React from 'react'
import { 
  Input, Select, LabelRow, InputRow
} from '../../styles'
import theme from '../../theme'

const FormGenerator = (form, setForm, obj, order) => {
    const table = [];
    order.forEach((row) => {
        const labelRow = [];
        const inputRow = [];
        row.forEach((dataPoint) => {
            const title = obj[dataPoint].title || dataPoint.replace(/([a-z])([A-Z])/, "$1 $2");
            if(obj[dataPoint].type !== 'box')
                labelRow.push(<td colspan={obj[dataPoint].span || 1}>{title}</td>)
            inputRow.push(<td colspan={obj[dataPoint].span || 1}>{(() => {
                switch (obj[dataPoint].type) {
                    case 'box':
                        return (<label><input type="checkbox" name={dataPoint} />{title}</label>)
                    case 'sel':
                        return (<Select style={form[dataPoint] && form[dataPoint].err ? {boxShadow: '0 0 5px 2px ' + theme.colors.red3} : {}} 
                        onInput={(e) => {setForm({name: dataPoint, err: false, value: e.target.value})}}>
                            <option value="">Select...</option>
                            {(obj[dataPoint].options || []).map((item) => <option>{item}</option>)}
                        </Select>)
                    default:
                        return (<Input style={form[dataPoint] && form[dataPoint].err ? {boxShadow: '0 0 5px 2px ' + theme.colors.red3} : {}} 
                        onInput={(e) => {setForm({name: dataPoint, err: false, value: e.target.value})}} placeholder={title + '...'} />)
                }
            })()}</td>)
        })
        table.push(<LabelRow>{labelRow}</LabelRow>)
        table.push(<InputRow>{inputRow}</InputRow>)
    })
    return table;
}

export default FormGenerator