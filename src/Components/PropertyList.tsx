import React, { useCallback } from "react";
import { FlatList } from "react-native";
import PropertyItem from "./PropertyItem";
import { Property } from "../Interfaces/Property";

interface PropertyListProps {
  properties: Property[];
}

const PropertyList = ({ properties }: PropertyListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: Property }) => <PropertyItem item={item} />,
    []
  );
  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        marginBottom: 70,
      }}
    />
  );
};

export default React.memo(PropertyList);
