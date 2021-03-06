import { Text, Circle } from "@chakra-ui/layout";
import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import * as Types from "./HandFight.types";
import PlayerHand from "./PlayerHand";
import colors from "shared/colors";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { GameResult, Hands } from "shared/enums";
import useGameContext from "hooks/useGameContext";

const HandFight = ({ playerHand, opponent, isOpponentReady }: Types.Props) => {
  const handsColor = useColorModeValue(colors.main, colors.mainDark);
  const { gameResult } = useGameContext();

  const getFillColor = () => {
    if (opponent) {
      switch (gameResult) {
        case GameResult.Win:
          return colors.resultLoser;
        case GameResult.Lose:
          return colors.resultWinner;
        case GameResult.Draw:
          return colors.resultDraw;
        case GameResult.Playing:
          return handsColor;
      }
    } else {
      switch (gameResult) {
        case GameResult.Win:
          return colors.resultWinner;
        case GameResult.Lose:
          return colors.resultLoser;
        case GameResult.Draw:
          return colors.resultDraw;
        case GameResult.Playing:
          return handsColor;
      }
    }
  };

  const OpponentHand = () =>
    isOpponentReady ? (
      playerHand !== Hands.None ? (
        <PlayerHand hand={playerHand} />
      ) : (
        <Flex flexDir="column" align="center" pb={[4, 8]}>
          <CheckCircleIcon boxSize={[8, 10, 16]} color={handsColor} />
          <Text align="center" fontWeight="bold" fontSize={[12, 16]} mt={[4, 8]}>
            Opponent made a pick!
          </Text>
        </Flex>
      )
    ) : (
      <Flex flexDir="column" align="center" pb={[4, 8]}>
        <Spinner speed="1.5s" w={[8, 10, 16]} h={[8, 10, 16]} color={handsColor} />
        <Text align="center" fontWeight="bold" fontSize={[12, 16]} mt={[4, 8]}>
          Opponent's still picking...
        </Text>
      </Flex>
    );

  const Hand = () =>
    playerHand !== Hands.None ? (
      <PlayerHand hand={playerHand} />
    ) : (
      <Text fontWeight="bold" fontSize={[16, 20]}>
        Pick hand!
      </Text>
    );

  return (
    <Circle
      size={opponent ? ["140px", "200px", "250px"] : ["120px", "160px", "200px"]}
      borderWidth={[2, 3, 5]}
      p={[3, 5]}
      borderColor={getFillColor()}
    >
      {opponent ? <OpponentHand /> : <Hand />}
    </Circle>
  );
};

export default HandFight;
