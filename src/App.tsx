import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import Sound from 'react-native-sound';

function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gamestate, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
    playSound();
  };

  const checkIsWinner = () => {
    if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[1] &&
      gamestate[0] === gamestate[2]
    ) {
      setGameWinner(`${gamestate[0]} won the game 🥳`);
    } else if (
      gamestate[3] !== 'empty' &&
      gamestate[3] === gamestate[4] &&
      gamestate[4] === gamestate[5]
    ) {
      setGameWinner(`${gamestate[3]} won the game! 🥳`);
    } else if (
      gamestate[6] !== 'empty' &&
      gamestate[6] === gamestate[7] &&
      gamestate[7] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[6]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[3] &&
      gamestate[3] === gamestate[6]
    ) {
      setGameWinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[1] !== 'empty' &&
      gamestate[1] === gamestate[4] &&
      gamestate[4] === gamestate[7]
    ) {
      setGameWinner(`${gamestate[1]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[5] &&
      gamestate[5] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[2]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[4] &&
      gamestate[4] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[4] &&
      gamestate[4] === gamestate[6]
    ) {
      setGameWinner(`${gamestate[2]} won the game! 🥳`);
    } else if (!gamestate.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  };

  const playSound = () => {
    var crash = new Sound('crash.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          crash.getDuration() +
          'number of channels: ' +
          crash.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      crash.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setTimeout(() => {
        crash.stop(() => {
          // Release the audio player resource after stopping
          crash.release();
        });
      }, 1000);
    });
  };

  const crossSound = () => {
    var tom = new Sound('tom.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          tom.getDuration() +
          'number of channels: ' +
          tom.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      tom.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setTimeout(() => {
        tom.stop(() => {
          // Release the audio player resource after stopping
          tom.release();
        });
      }, 600);
    });
  };

  const circleSound = () => {
    var toms = new Sound('toms.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          toms.getDuration() +
          'number of channels: ' +
          toms.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      toms.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setTimeout(() => {
        toms.stop(() => {
          // Release the audio player resource after stopping
          toms.release();
        });
      }, 600);
    });
  };

  const onChangeItem = (itemNumber: Number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }
    if (gamestate[itemNumber] === 'empty') {
      gamestate[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
      if (isCross) {
        crossSound();
      } else {
        circleSound();
      }
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }

    checkIsWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      <FlatList
        numColumns={3}
        data={gamestate}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'reload game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
