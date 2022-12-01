import { Text, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const BloquePrincipal = () => {
  const [notaPrincipal, setNotaPrincipal] = useState(null);

  useEffect(() => {
    axios
      .get(
        "api/notes/byURL/Horscopo_semanal_signo_por_signo_qu_te_dicen_los_astros"
      )
      .then((nota) => {
        setNotaPrincipal(nota.data);
      });
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        overflow="hidden"
        height="490px"
        position="relative"
        width="100vw"
        flexDirection="row"
        marginTop="125px"
        bgGradient='linear(to-r, rgb(0,0,0,0)65%, rgb(1,1,1,1)), url("https://bucket.somosohlala.com.ar/s3fs-public/styles/mainjumbo_1800/public/2022-11/astros-bomba_2.png.webp")'
      >
        <Box
          width="100%"
          height="auto"
          position="absolute"
          z-index="1000"
          display="flex"
          textAlign="left"
          alignItems="center"
        >
          <Box
            display="flex"
            width="100%"
            flexDir="row"
            justifyContent="flex-end"
            height="100%"
          >
            {notaPrincipal ? (
              <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                width="700px"
                paddingRight="10%"
              >
                <Text
                  fontSize="4xl"
                  color="white"
                  width="400px"
                  marginTop="15%"
                >
                  {notaPrincipal.field_title_pre}
                  <br />
                  {notaPrincipal.field_title}
                </Text>
                <Text fontSize="1xl" color="white" width="400px">
                  por {notaPrincipal.author}
                </Text>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BloquePrincipal;
