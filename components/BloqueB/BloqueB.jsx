import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import axios from "axios";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function BloqueB() {
  const [slider, setSlider] = useState(null);
  const [notas, setNotas] = useState(null);

  useEffect(() => {
    axios.get("/api/notes/byCategory/Calidad_de_Vida").then((notes) => {
      console.log(notes.data);
      setNotas(notes.data);
    });
  }, []);

  console.log(notas)
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });


  return (
    <Container
      marginTop="40px"
      display="flex"
      flexDir="column"
      maxW="67%"
      border="1px"
      borderRadius="lg"
      borderColor=" #f0f0f0"
    >
      <Text
        fontSize="50px"
        _hover={{
          color: "purple",
        }}
      >
        Calidad de Vida
      </Text>
      <Box
        marginTop="40px"
        position={"relative"}
        height={"600px"}
        width={"100%"}
        overflow={"hidden"}
        borderRadius="lg"
      >
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>

        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>

        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {
            notas ? (
              notas.map((nota) => (
                <Box
                  key={nota.id}
                  height={"100%"}
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${nota.field_img_primary})`}
                >
                  <Container size="container.lg" height="600px" position="relative">
                    <Stack
                      spacing={4}
                      w={"100%"}
                      maxW={"100%"}
                      position="absolute"
                      top="70%"
                      transform="translate(-40%, -50%)"
                    >
                      <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} color="white">
                        {nota.title}
                      </Heading>
                      <Text fontSize={{ base: "lg", lg: "xl" }} color="white">
                        {nota.field_description}
                      </Text>
                    </Stack>
                  </Container>
                </Box>
            ))) : null
          }
          
        </Slider>
      </Box>
    </Container>
  );
}
