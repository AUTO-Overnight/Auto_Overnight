import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Colors, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import constColors from '../../constants/colors';
import { RootState } from '../../store';
import { setLoginErrorModalVisible } from '../../store/login';
import { Button, CloseButton, ModalView, Text } from '../../theme';

const screen = Dimensions.get('screen');

export default function ModalLoginError() {
  const { loginErrorModalVisible } = useSelector(({ login }: RootState) => ({
    loginErrorModalVisible: login.loginErrorModalVisible,
  }));
  const dispatch = useDispatch();
  const onPressClose = useCallback(() => {
    dispatch(setLoginErrorModalVisible(false));
  }, []);

  const isDark = useTheme().dark;

  return (
    <ModalView
      modalVisible={loginErrorModalVisible}
      ModalViewRender={() => (
        <>
          <CloseButton closeBtn={onPressClose} />

          <>
            <Text style={styles.titleText}>로그인 에러가 나타나요 😞</Text>
            <Text
              style={styles.subText}
            >{` 현재 간헐적으로 로그인 에러가 나타나시는\n 분들이 있는데 불편 하시더라도\n 비밀번호 변경 후 재 로그인 부탁드리겠습니다 😃`}</Text>
            <Text
              style={styles.subText}
            >{` 만약 변경 후에도 동일한 증상이 발생될 시 카카오톡을 통해서  문의 부탁 드려요`}</Text>

            <View style={styles.blankView} />
            <View
              style={[
                styles.buttonOverLine,
                { borderColor: isDark ? Colors.grey100 : Colors.grey700 },
              ]}
            />
            <Button
              buttonNumber={1}
              buttonText="닫기"
              onPressFunction={onPressClose}
            />
          </>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  blankView: {
    height: 15,
  },
  titleText: {
    fontSize: 17,
    alignSelf: 'flex-start',
    fontFamily: 'NanumSquareBold',
    letterSpacing: -1,
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    fontFamily: 'NanumSquareR',
    letterSpacing: -1,
    marginLeft: 15,
  },
  buttonOverLine: {
    borderTopWidth: 0.4,
    width: screen.width * 0.94,
    marginTop: 20,
    borderColor: constColors.mainDarkColor,
  },
});
