import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	fetchPopularMovie,
	fetchTopRatedMovie,
	fetchTrendingMovie,
	fetchUpcomingMovie,
} from '../api';
import Loader from '../components/loader';
import TrendingMovie from '../components/trending-movie';
import UpcomingMovie from '../components/upcoming-movie';

export default function Home() {
	const [trending, setTrending] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [popular, setPopular] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const navigation = useNavigation();

	useEffect(() => {
		getTrendingMovie();
		getUpcomingMovie();
		getTopRatedMovie();
		getPopularMovie();
	}, []);

	const getTrendingMovie = async () => {
		const data = await fetchTrendingMovie();
		data.results && setTrending(data.results);
		setIsLoading(false);
	};

	const getUpcomingMovie = async () => {
		const data = await fetchUpcomingMovie();
		data.results && setUpcoming(data.results);
	};

	const getTopRatedMovie = async () => {
		const data = await fetchTopRatedMovie();
		data.results && setTopRated(data.results);
	};

	const getPopularMovie = async () => {
		const data = await fetchPopularMovie();
		data.results && setPopular(data.results);
	};

	return (
		<View className='flex-1 bg-slate-950'>
			<SafeAreaView>
				<StatusBar style='light' />
				<View
					className={
						'flex-row justify-between items-center mx-4 border-b-2'
					}
				>
					<Image source={require('../../assets/logo.png')} />
					<TouchableOpacity
						onPress={() => navigation.navigate('Search')}
					>
						<MagnifyingGlassIcon
							size={30}
							strokeWidth={2}
							color={'white'}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{isLoading ? (
				<Loader />
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 20 }}
				>
					{trending.length > 0 && (
						<TrendingMovie trending={trending} />
					)}
					{upcoming.length > 0 && (
						<UpcomingMovie
							upcoming={upcoming}
							title={'Upcoming movie'}
						/>
					)}
					{upcoming.length > 0 && (
						<UpcomingMovie
							upcoming={trending.reverse()}
							title={'Trending movie'}
						/>
					)}
					{popular.length > 0 && (
						<UpcomingMovie
							upcoming={popular}
							title={'Popular movie'}
						/>
					)}
					{topRated.length > 0 && (
						<TrendingMovie trending={topRated} />
					)}
				</ScrollView>
			)}
		</View>
	);
}
