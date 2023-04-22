import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'


const ListSearchedPets = () => {
  /* const route = useRoute<ListPets>(); */

  return (
    <View>
      {/* {route.params.length > 0 ? (
        route.params.map((values) => (
          <ListPetsComponent
            key={values.id}
            id={values.id}
            email={values.email}
            avatar={values.avatar}
            name={values.name}
          />
        ))
      ) : (
        <Text>Não há pets cadastrados</Text>
      )} */}
    </View>
  );
};

export { ListSearchedPets };









