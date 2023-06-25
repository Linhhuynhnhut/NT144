import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, FONTS } from "../constants";

const dimension = 40;
const marginVal = -18;
const ViewersList = ({ allViews }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				marginRight: 3 * marginVal,
			}}
		>
			{allViews.slice(0, 3).map((item, index) => {
				return (
					<View
						key={item.id}
						style={{ marginLeft: index == 0 ? 0 : marginVal }}
					>
						<Image
							source={item.profilePic}
							style={{
								width: dimension,
								height: dimension,
								borderRadius: 30,
							}}
							resizeMode="cover"
						/>
					</View>
				);
			})}
			<View
				style={{
					marginLeft: marginVal,
					width: dimension,
					height: dimension,
					borderRadius: dimension,
					backgroundColor: COLORS.lime,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						color: COLORS.lightGray,
						...FONTS.body5,
						fontSize: 11,
					}}
				>
					+{allViews.length - 3}
				</Text>
			</View>
		</View>
	);
};

export default ViewersList;
