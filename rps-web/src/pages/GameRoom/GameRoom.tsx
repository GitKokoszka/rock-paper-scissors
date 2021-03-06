import { Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { GameRoomStates } from "shared/enums";
import colors from "shared/colors";
import urlJoin from "url-join";
import useGameContext from "../../hooks/useGameContext";
import { useHistory, useParams } from "react-router-dom";
import LoadingScreen from "visuals/LoadingScreen";
import useToastOnHerokuBoot from "hooks/useToastOnHerokuBoot";
import GameRoomWaiting from "pageComponents/GameRoomWaiting";
import GameRoomPlaying from "pageComponents/GameRoomPlaying";

const GameRoom = () => {
  const { id } = useParams<{ id: string }>();
  const handsColor = useColorModeValue(colors.main, colors.mainDark);
  const sendLink = urlJoin(process.env.REACT_APP_FRONTEND_URL, "game", id);
  const history = useHistory();
  const { roomState } = useGameContext();

  useToastOnHerokuBoot({ roomState });

  switch (roomState) {
    case GameRoomStates.Loading:
      return <LoadingScreen />;
    case GameRoomStates.Waiting:
      return <GameRoomWaiting sendLink={sendLink} />;
    case GameRoomStates.Playing:
    case GameRoomStates.Left:
      return <GameRoomPlaying />;
    case GameRoomStates.Full:
      return (
        <Flex flex={1} justifyContent="center" align="center">
          <Text fontWeight="black" fontSize={[32, 36, 48]}>
            Room is full!
          </Text>
        </Flex>
      );
    case GameRoomStates.Error:
      return (
        <Flex flex={1} flexDir="column" justifyContent="center" align="center">
          <Text fontWeight="black" fontSize={[20, 28, 48]}>
            {"Something went wrong :("}
          </Text>
          <Text mt={4} fontSize={[16, 24, 32]}>
            Try again with new game!
          </Text>
          <Button mt={8} border={`2px ${handsColor} solid`} onClick={() => history.push("/")}>
            Click to play again
          </Button>
        </Flex>
      );
  }
};

export default GameRoom;
