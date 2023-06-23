import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({ data, containerStyle, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				flexDirection: "row",
				alignItems: "center",
				padding: 10,
				marginHorizontal: 20,
				borderRadius: SIZES.radius,
				elevation: 1,
				marginBottom: 10,
				backgroundColor: COLORS.gray2,
			}}
		>
			{/* Image */}
			<Image
				source={data.image}
				style={{ height: 90, width: 90, borderRadius: SIZES.radius }}
				resizeMode="cover"
			/>
			{/* Details */}
			<View
				style={{
					paddingHorizontal: 20,
					width: "75%",
				}}
			>
				<Text style={{ flex: 1, ...FONTS.h3, color: COLORS.blue }}>
					{data.name}
				</Text>
				<Text
					style={{
						...FONTS.body5,
						color: COLORS.lightGray2,
						fontSize: 11,
					}}
				>{`${data.duration} | ${data.serving} Serving`}</Text>
			</View>
		</TouchableOpacity>
	);
};
export default CategoryCard;
