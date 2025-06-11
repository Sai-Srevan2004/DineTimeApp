import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FindSlots = ({
  date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
  restaurant,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);

  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };


  const handleSlotPress = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: selectedSlot != null ? "row" : "column" }}>
        <View style={{ flex: selectedSlot != null ? 1 : undefined }}>
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                backgroundColor: "#f49b33",
                padding: 8,
                marginVertical: 12,
                marginHorizontal: 8,
                borderRadius: 10,
              }}
            >
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                  backgroundColor: "#f49b33",
                  padding: 8,
                  marginVertical: 12,
                  marginHorizontal: 8,
                  borderRadius: 10,
                }}
              >
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && (
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginHorizontal: 8,
            padding: 8,
            backgroundColor: "#474747",
            borderRadius: 10,
          }}
        >
          {slots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={{
                margin: 5,
                padding: 16,
                backgroundColor: "#f49b33",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                opacity:
                  selectedSlot && selectedSlot !== slot ? 0.5 : 1,
              }}
              onPress={() => handleSlotPress(slot)}
              disabled={selectedSlot != null && selectedSlot !== slot}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FindSlots;
