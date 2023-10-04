import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { image185 } from '../api';

const { width, height } = Dimensions.get('window');

export default function UpcomingMovie({ upcoming, title }) {
	const navigation = useNavigation();

	return (
		<View className={'mb-8 space-y-4'}>
			<Text className={'text-xl text-white font-semibold'}>
				{title}
			</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{upcoming.map(item => (
					<TouchableWithoutFeedback
						key={item.id}
						onPress={() => navigation.navigate('Movie', item.id)}
					>
						<View className={'space-y-1 mr-4'}>
							<Image
								source={{ uri: image185(item.poster_path) }}
								className={'rounded-3xl'}
								style={{ width: width * 0.3, height: height * 0.2 }}
							/>
							<Text className={'text-white'}>
								{item.title.length > 22
									? item.title.slice(0, 22) + '...'
									: item.title}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
		</View>
	);
}
