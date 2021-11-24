import React, {useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { LogBox } from 'react-native';
import {View, FormControl} from "native-base"

// Options data must contain 'item' & 'id' keys

const App = (props) => {
  
  useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  return (
    <FormControl isRequired>
         <SelectBox style="width:100%"
          label=""
          inputPlaceholder={props.itemlabel}
          options={props.items}
          value={selectedTeam}
          onChange={onChange()}
          hideInputFilter={false}
        />
    </FormControl>
  )

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }
}

export default App