import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiFileText, FiUser } from "react-icons/fi";
import axios from "axios";

const LinkItems = [
  { name: "Notas", icon: FiFileText, url: "/admin" },
  { name: "Categorias", icon: FiUser, url: "/admin/Categorias" },
  { name: "Subcategorias", icon: FiFileText, url: "/admin/Subcategorias" },
  { name: "Contenido", icon: FiFileText, url: "/admin/Contenido" },
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href={"/"}>
          <Image alt="wow-logo" src="/assets/wow.png" width="250" height="50" />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, i) => (
        <Box key={i}>
          {link.name == "Contenido" ? (
            <SubNav key={i} icon={link.icon}>
              {link.name}
            </SubNav>
          ) : (
            <Link href={link.url} key={i}>
              <NavItem key={i} icon={link.icon}>
                {link.name}
              </NavItem>
            </Link>
          )}
        </Box>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const SubNav = ({ icon, children, ...rest }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((categories) => setCategories(categories.data));
  }, []);
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      {...rest}
    >
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            {icon && <Icon mr="4" fontSize="16" as={icon} />}
            {children}
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Link href={`/admin/Contenido`}>
              <NavItem>{"Home"}</NavItem>
            </Link>
            {categories
              ? categories.map((link, i) => (
                  <Link href={`/admin/Contenido/${link.url}`} key={i}>
                    <NavItem key={i}>{link.name}</NavItem>
                  </Link>
                ))
              : null}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
