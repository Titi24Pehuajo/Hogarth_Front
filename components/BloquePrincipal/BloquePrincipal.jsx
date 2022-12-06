import { Text, Box } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BloquePrincipal = () => {
  const [notaPrincipal, setNotaPrincipal] = useState(null);

  useEffect(() => {
    axios
      .get(
        "api/notes/byURL/Cmo_sobrevivir_a_diciembre_8_claves_para_transitar_el_ltimo_mes_del_ao"
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
        height="492px"
        position="relative"
        width="100vw"
        flexDirection="row"
        marginTop="115px"
        bgGradient='linear(to-r, rgb(0,0,0,0)65%, rgb(0,0,0,1)), url("https://bucket.somosohlala.com.ar/s3fs-public/styles/mainjumbo_1800/public/2022-12/demencia-bomba.png.webp?itok=u3HpffUJ")'
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
                width="600px"
                paddingRight="10%"
              >
                <Link href={`notes/byURL/${notaPrincipal.url}`}>
                  <Text
                    fontSize="4xl"
                    color="white"
                    width="400px"
                    marginTop="15%"
                    fontWeight="bold"
                  >
                    {notaPrincipal.field_title_pre}
                    <br />
                    {notaPrincipal.field_title}
                  </Text>
                  <Text fontSize="1xl" color="white" width="400px">
                    por {notaPrincipal.author}
                  </Text>
                </Link>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BloquePrincipal;
