import {
   StyleSheet
} from "react-native";



export const flexBoxRow = StyleSheet.create({
   default: {
      display: 'flex',
      flexDirection: 'row',
   },
   SpaceBetweenCenter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   SpaceBetweenStart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
   },
   SpaceBetweenEnd: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
   },
   SpaceBetweenStretch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
   },

   CenterCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   SpaceAroundCenter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
   },
   FlexStartCenter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   FlexEndCenter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
   },

})



export const flexBoxColumn = StyleSheet.create({
   default: {
      display: 'flex',
      flexDirection: 'column',
   },
   spaceBetween: {
      flexDirection: 'column',
      justifyContent: 'space-between'
   },
   flexEnd: {
      flexDirection: 'column',
      justifyContent: 'flex-end'
   },
   FlexStartFlexStart: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
   },
   CenterCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },

   FlexStartFlexStart: {
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
})