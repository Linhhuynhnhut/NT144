import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text } from "react-native";

import React from "react";
import { COLORS, FONTS } from "../constants";

const CustomButton = ({ buttonText, pressHandler, colors, buttonStyling }) => {
	if (colors.length > 0) {
		return (
			<TouchableOpacity onPress={pressHandler}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{ ...buttonStyling }}
					colors={colors}
				>
					<Text
						style={{
							color: COLORS.lightGray,
							...FONTS.h3,
							textAlign: "center",
						}}
					>
						{buttonText}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	}
	return (
		<TouchableOpacity onPress={pressHandler} style={{ ...buttonStyling }}>
			<Text
				style={{
					color: COLORS.lightGray,
					...FONTS.h3,
					textAlign: "center",
				}}
			>
				{buttonText}
			</Text>
		</TouchableOpacity>
	);
};
export default CustomButton;
