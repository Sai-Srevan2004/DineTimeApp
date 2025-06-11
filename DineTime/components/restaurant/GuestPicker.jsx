// import { View, Text, TouchableOpacity } from "react-native";


// const GuestPickerComponent = ({ selectedNumber, setSelectedNumber }) => {
//   const decrement = () => {
//     if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
//   };
//   const increment = () => {
//     if (selectedNumber < 12) setSelectedNumber(selectedNumber + 1);
//   };
//   return (
//     <View className="flex flex-row items-center rounded-lg text-white text-base">
//       <TouchableOpacity onPress={decrement} className="rounded">
//         <Text className="text-white text-lg border border-[#f49b33] rounded-l-lg px-3">
//           -
//         </Text>
//       </TouchableOpacity>
//       <Text className="px-3 text-white bg-[#474747] border border-[#474747] text-lg">
//         {selectedNumber}
//       </Text>
//       <TouchableOpacity onPress={increment} className="rounded">
//         <Text className="text-white text-lg border border-[#f49b33] rounded-r-lg px-3">
//           +
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GuestPickerComponent;


import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GuestPickerComponent = ({ selectedNumber, setSelectedNumber }) => {
  const decrement = () => {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  };
  const increment = () => {
    if (selectedNumber < 12) setSelectedNumber(selectedNumber + 1);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.buttonLeft}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.numberText}>{selectedNumber}</Text>
      <TouchableOpacity onPress={increment} style={styles.buttonRight}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonLeft: {
    borderWidth: 1,
    borderColor: "#f49b33",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "transparent",
  },
  buttonRight: {
    borderWidth: 1,
    borderColor: "#f49b33",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  numberText: {
    paddingHorizontal: 12,
    color: "white",
    backgroundColor: "#474747",
    borderWidth: 1,
    borderColor: "#474747",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GuestPickerComponent;
