import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Dimensions,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import { image500 } from '../api';

const { width, height } = Dimensions.get('window');

export default function MovieCard({ item }) {
	const navigation = useNavigation();

	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate('Movie', item.id)}
		>
			<Image
				source={{ uri: image500(item.poster_path) }}
				style={{ width: width * 0.7, height: height * 0.5 }}
				className={'rounded-3xl'}
			/>
		</TouchableWithoutFeedback>
	);
}
