/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, UnderlineText,TopBar,
NavigationHeader, MaterialCommunityIcon as Icon} from '../theme';
import { ScrollEnabledProvider, useScrollEnabled } from '../contexts';
import * as D from '../data';
import Person from './Person';
import { LeftRightNavigation } from '../components';
import type { LeftRightNavigationMethods } from '../components';

export default function Home() {
	// navigation
	const navigation = useNavigation();
	const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
	const goRight = useCallback(
		() => navigation.navigate('HomeRight', { name: 'Jack', age: 32 }),
		[]
	);
	const open = useCallback(() => {
		navigation.dispatch(DrawerActions.openDrawer());
	}, []);
	const logout = useCallback(() => {
		navigation.navigate('Login');
	}, []);
	// for people
	const [scrollEnabled] = useScrollEnabled();

	const leftRef = useRef<LeftRightNavigationMethods | null>(null);

	const flatListRef = useRef<FlatList | null>(null);

	return (
		<SafeAreaView>
			<ScrollEnabledProvider>
				<View style={[styles.view]}>
					<NavigationHeader
						title="Home"
						Left={() => <Icon name="menu" size={30} onPress={open} />}
						Right={() => <Icon name="logout" size={30} onPress={logout} />}
					/>
					{/* <TopBar noSwitch>
            <UnderlineText onPress={addPerson} style={styles.text}>
              add
            </UnderlineText>
            <UnderlineText onPress={removeAllPersons} style={styles.text}>
              remove all
            </UnderlineText>
          </TopBar> */}
					<LeftRightNavigation
						ref={leftRef}
						distance={40}
						flatListRef={flatListRef}
						onLeftToRight={goLeft}
						onRightToLeft={goRight}
					>
						{/* <FlatList
              ref={flatListRef}
              scrollEnabled={scrollEnabled}
              data={people}
              renderItem={({item}) => (
                <Person person={item} deletePressed={deletePerson(item.id)} />
              )}
              keyExtractor={item => item.id}
            /> */}
					</LeftRightNavigation>
				</View>
			</ScrollEnabledProvider>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1 },
	text: { marginRight: 10, fontSize: 20 },
});
