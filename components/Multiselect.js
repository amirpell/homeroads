







import React, { Component, useState } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
const items = [{
    name: 'sale'
  }, {
    name: 'rent'
  }, {
    name: 'sale2'
  }, {
    name: 'rent2'
  }
];
const [selectedItems, setSelectedItems] = useState("");

class Multiselect extends Component {

  state = {
    selectedItems : []
  };
  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="name"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> 
            setSelectedItems(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
        {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}

</View>
      </View>
    );
  }
}
export default Multiselect;


