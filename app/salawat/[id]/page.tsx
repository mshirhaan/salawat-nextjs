//salawat/[id]/page.tsx

"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Tooltip,
  Select,
  Stack,
  Divider,
  Spinner,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ReactNode, Suspense, useEffect, useState } from "react";

import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"; // Import Joyride

import { db } from "@/lib/firebase";
import ClientSideCounter from "./ClientSideCounter";
import TooltipWithTouch from "./TooltipWithTouch";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  sum,
} from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/Login";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { withAuth } from "@/components/withAuth";
import { SettingsIcon } from "@chakra-ui/icons";
import TransliterationAnnouncement from "@/components/TransliterationAnnouncement";
interface SalawatWord {
  word: string;
  translations: { [key: string]: string };
}

interface SalawatLine {
  arabic: string;
  translations: { [key: string]: string };
  words: SalawatWord[];
  transliteration?: string;
}

interface SalawatData {
  title: string;
  lines: SalawatLine[];
}

// Define your tour steps
const tourSteps: Step[] = [
  {
    target: "body",
    content: "Are you ready for a quick tour?",
    placement: "center",
  },
  {
    target: ".salawat-title",
    content: "This is the title of the Salawat.",
    placement: "top",
  },
  {
    target: ".salawat-text",
    content: "Here is the Arabic text with tooltips.",
    placement: "top",
  },
  {
    target: ".salawat-translation",
    content: "This is the translation of the Arabic text.",
    placement: "top",
  },
  {
    target: ".counter-button",
    content:
      "Click here to count the Salawat. Every click will be saved to your profile.",
    placement: "top",
  },
  {
    target: ".salawat-settings",
    content: "Click here to change the settings like font size.",
    placement: "top",
  },
];

async function fetchSalawatData(id: string) {
  const salawat = await getSalawatData(id);
  return salawat;
}
async function getSalawatData(id: string): Promise<SalawatData> {
  const salawatRef = doc(db, "salawat", id);
  const salawatSnap = await getDoc(salawatRef);

  if (!salawatSnap.exists()) {
    throw new Error("Salawat not found");
  }

  return salawatSnap.data() as SalawatData;
}

const MotionBox = motion(Box);

const imageUrls = [
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442776595-FLQNT4Y1P9WW6X9R4VD7/DJI_0062.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442608579-7GBAJE6ZC55EC3Z2WDKW/850_4393-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442626013-QJOFHH3B2HUOCYN6E0GV/850_5158.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442623868-VK29SS8EN9JUVN70LGL1/850_5080.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442474443-LCPHZCHS0V92RKB6O8W3/850_0662-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442476161-78SACHZ5K74ZX5Y4TKT3/850_0680-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442479045-Q53LTA10KFGVRTHFF6A8/850_0717-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442490272-SXQVH6MNOITNRNYK3C1V/850_0841.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442496114-G3UJ52DPP4OGP13XUCRC/850_0917-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442503513-UYF061NKABD0GV30QC2K/850_1244.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442505937-VG7KLPDNFFLQM9H775WM/850_1255.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442622789-5OC26CI9LH78BMJYPCHO/850_5069.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442615956-K04IC0VGY11MPEHAOOAI/850_4754-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442664518-D1T4YMZVYSGHWZXF2ZVQ/850_7743.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442670634-WIAMGIVFJRH9VW6U27CY/850_7789-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442671780-8YE8FNHTX1QHSBRRKEJE/850_7798-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442751682-KQO0P1C45Q216PHSH9Q9/D5D_7045.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442755556-I1XNLMR6JX71ZE96PK8S/D5D_7132.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442780764-N2FGJX302I3HFQ1V3VZV/DJI_0123.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442785028-U6YLICRQ92K8N6LNXO58/DJI_0150.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442791003-1Z5R8IHBQ6KDM3VBC9AH/DJI_0185.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442797565-V2BM88VQ1IOKF4RSOTZ4/DJI_0231.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442810889-ZS8K7FL2PW9X47HOFJG5/DSC_0546.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442435314-2JMGLBFMNTQPE3ATIZJK/_DZ65115.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442436956-7JRLXRVDDKD274ZY15IG/810_9521.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442438726-EI94S8SV0CDKZWBGA1X4/810_9528.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442440658-MS5FJOKK68XMT3R2OBE4/810_9540-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442442591-P5908WRRQ4RYFU6PG70R/810_9624.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442444433-RJRXQOZUWGXKN0MBD1KL/810_9798.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442447668-EVI0PR2AYBVJV9Q4LARZ/850_0244.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442449830-7PXX6W91JVGFNC9AQ26M/850_0263.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442451710-SDT96BOLO0QR5ANLRLJO/850_0284.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442462278-74GFUIGCIIDN51A4RN7F/850_0505.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442463892-CT8HIJ14KOA5FZDLEDB4/850_0506.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442465680-MDCE0NM875B5GJC9JVXY/850_0508.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442467412-1KNXRCN53Q5K62F0199Q/850_0509.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442468791-9PM79022AK7BDXX5613Z/850_0518-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442470337-YTYG3EHRH7SWBQSZ3SBH/850_0523.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442510905-VX0X781LD8QR76V15XBI/850_1327.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442514472-XMVOT2EJ9EOZWS0O1SSB/850_1346.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442516748-4Y7DUE314L9RVJTUI03O/850_1351.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442519138-GZX8Q0CSGQ3XVSY0F0V6/850_1352.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442520022-FIAU95CGS68G82VE7BPM/850_1506.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442523559-DC6RCQYUDVEJ0LM7QF5H/850_1624.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442526200-YKXDQI5MLY3AJVYHLVF7/850_1648.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442529702-ZBVTPHEXT9JAB9S40TOK/850_1661.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442530104-JHRNR76VRFD37E6F4UAA/850_1685.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442532625-L3G0VD3V6TEUHXCGG8IC/850_1737-Pano.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442536500-C9GVFO43X1VJO7USYISB/850_1808.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442539644-6HJ69JAVONG46VAEB8GI/850_1956-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442543301-P97365YJ7EWRDH0AL23D/850_2060-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442545495-USHB7NFJPNL0GOJ2S478/850_2092.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442549527-4SSNOPJRZ1PFXIQAA7UD/850_2098.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442550579-IDCAG9I34M4K0ZN0D3YS/850_2102.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442553039-IZDH2KALWE7SZSPYHLH6/850_2105.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442555256-RNDDDFMQMEUFQETYZDZD/850_2107.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442562611-2B2Z7GVLU2QSNWRV0PNT/850_2182.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442566193-SNFHBI4GCKQ0YDASFQMQ/850_2197.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442583965-247PIQA96FKTM96MSMCS/850_2291.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442588270-ZCXSPMN17UXDOQF1LFBV/850_2304.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442588310-44NQC5AG2ZJ4ORGPPSU1/850_2310.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442589882-Z2ALLOQXPPH1HFGCOZFL/850_2316.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442597329-MH08JO9RRHJUU7GV16EH/850_2332-Pano.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442607753-0UOWY1WBDDQO82L64AQ1/850_4156.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442611102-EPULX25YBAN74V3S40WA/850_4671.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442629601-IHIRAP4ISZHZYDPPXFWI/850_7235-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442631542-OIGR59PIST9KGBDNDM1C/850_7244.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442632989-FL0W5BGKNCQQNU0X24M5/850_7290-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442646974-I6OA4BJP9OBDXJ3RHDCN/850_7437-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442650099-WV6O36BLXG5QQOB5MRFF/850_7536.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442667779-9EYX8XMVGLORKMVMOW0T/850_7759-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442668759-S9HS6FYYY0A2B41OLX22/850_7778-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442674255-NK0LP3YEUCNGP8UYELDG/850_7802-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442675392-7KNRU6L8FLCZSJGJZ0AO/850_7816-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442677328-PWA6DLNYPNMO8G1A1M1B/850_7817.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442681620-CTCOFAYG393MT8WTC91H/850_7822-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442682167-2SL6LVT1NUMH8OZRNPWM/850_7828-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442686503-CHXND7N3W9I0HY0MYDPF/850_7852-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442687645-5HKBORRZU8AOQUXHW71X/850_7865-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442696328-R5GHJ0TCGQDGJUUMBKKE/850_7893-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442698130-SLUNX1AJ0G8D5CX3GET5/850_7911-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442700735-JLEXWO9WL0D4HRDO6RBR/850_7914.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442704280-5JP386N2L6SZEF25YWRY/850_7929.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442704276-UVMNX2N9UKB9LGGHV2AJ/850_7951.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442707843-JVIASHHE46V5Q040NNYN/850_7978-HDR.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442712105-Z6Y90C2O7TUQPTDQ2IZF/850_8100.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442717894-XYQGWSBV65U175HEV2RN/850_8733.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442724266-LDAUF5TNBKPAJIW67TYR/D5D_5877.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442725510-JXGLBLIXR7FZWQX0IZET/D5D_5884.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442727585-CJHLIMNDRN4KY7UTF2Z3/D5D_5943.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442735017-1D4351NMZHHLZIESPTWK/D5D_6005.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442741896-P5CDBVLXVWZA604PNDFE/D5D_6089.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442745137-P199HX3J7J055UT8TQR6/D5D_6099.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442762837-J17CDWSR7SQQ7MUTSAFS/D5D_7536.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442765692-NBQBBEN2QAVDQAPPOVM7/D5D_8423.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442769276-C442ZXG3L9HP8BL4HWT8/D5D_8572.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442804524-7C7G8KLYR9Q8G7Y7HI3T/DSC_0190.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442817776-LHA8POSVDKJEFFAMMIQI/DSC_4678.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442819758-F5UE54O6XRY3PKLMOZYZ/DSC_4679.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442831281-SUANFHDTQBCH5N18CX0X/DSC_4888.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442837959-S9RK4CHHXRP620IFXOE9/DSC_4969.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624442841276-T6YCRTJ15NN94V3ATTYJ/DSC_5114.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624443027151-QBCGMXC72PGF120XZGQU/DSC_5947.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624443028036-DOQEGIY3YNNEH4ZE7OCY/DSC_6040.jpeg",
  "https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624443029036-T7R8L7IJYA52ZIYMD2TM/DSC_6162.jpeg",
];

imageUrls.sort(() => Math.random() - 0.5);
function SalawatPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [salawat, setSalawat] = useState<SalawatData | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls for Drawer
  const [totalSubmittedCount, setTotalSubmittedCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false); // State to control the tour
  const [showTranslation, setShowTranslation] = useState(true); // Controls translation visibility
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState(24); // Arabic font size
  const [translationFontSize, setTranslationFontSize] = useState(16); // Translation font size
  const [transliterationFontSize, setTransliterationFontSize] = useState(16);
  const [counterButtonSize, setCounterButtonSize] = useState(90); // Counter button size

  // Load settings from localStorage on page load
  useEffect(() => {
    const savedArabicFontSize = localStorage.getItem("arabicFontSize");
    const savedTranslationFontSize = localStorage.getItem(
      "translationFontSize"
    );
    const savedTransliterationFontSize = localStorage.getItem(
      "transliterationFontSize"
    );
    const savedShowTranslation = localStorage.getItem("showTranslation");

    const savedShowTransliteration = localStorage.getItem(
      "showTransliteration"
    );

    const savedCounterButtonSize = localStorage.getItem("counterButtonSize");

    if (savedArabicFontSize) {
      setArabicFontSize(parseInt(savedArabicFontSize));
    }
    if (savedTranslationFontSize) {
      setTranslationFontSize(parseInt(savedTranslationFontSize));
    }
    if (savedTransliterationFontSize) {
      setTransliterationFontSize(parseInt(savedTransliterationFontSize));
    }
    if (savedShowTranslation) {
      setShowTranslation(savedShowTranslation === "true");
    }

    if (savedShowTransliteration) {
      setShowTransliteration(savedShowTransliteration === "true");
    }

    if (savedCounterButtonSize) {
      setCounterButtonSize(parseInt(savedCounterButtonSize));
    }
  }, []);

  const language = "en";

  useEffect(() => {
    if (user && !user.emailVerified) {
      router.push("/verify-email");
    }
  }, [user, router]);

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        const data = await fetchSalawatData(params.id as string);
        setSalawat(data);
      }
    }
    loadData();
  }, [params.id]);

  useEffect(() => {
    async function fetchTotalCount() {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where(`salawatCounts.${params.id}`, ">", 0));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().salawatCounts[params.id];
      });
      setTotalSubmittedCount(total);
    }
    fetchTotalCount();
  }, [params.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenSalawatTour");
    if (!hasSeenTour) {
      setIsTourOpen(true);
    }
  }, []);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem("hasSeenSalawatTour", "true");
      setIsTourOpen(false);
    }
  };
  const renderArabicTextWithTooltips = (
    arabicText: string,
    words: SalawatWord[]
  ) => {
    const wordMap = new Map(
      words.map((word) => [
        word.word,
        (word.translations && word.translations[language]) || "",
      ])
    );

    return (
      <Text
        fontFamily="'Uthmanic', 'Amiri', serif"
        fontSize={`${arabicFontSize}px`}
        color="white"
        textAlign="center"
        lineHeight="1.8"
        className="salawat-text"
      >
        {arabicText.split(" ").map((word, index) => (
          <Suspense key={index} fallback={<span>{word} </span>}>
            <TooltipWithTouch label={wordMap.get(word) || ""} hasArrow>
              <Text
                as="span"
                display="inline"
                cursor="pointer"
                _hover={{ color: "teal.500" }}
                transition="color 0.3s ease"
              >
                {word}
              </Text>
            </TooltipWithTouch>{" "}
          </Suspense>
        ))}
      </Text>
    );
  };

  if (!user) {
    return <Login />;
  }

  if (!salawat) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="lg" color="teal.500" />
      </Flex>
    );
  }

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      <TransliterationAnnouncement />
      {/* Video Background */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        // src="https://cdn.pixabay.com/video/2022/03/30/112361-694236354_large.mp4"
        src="https://cdn.pixabay.com/video/2024/01/26/198164-906869460_large.mp4"
        style={{
          position: "fixed", // Changed to fixed
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      /> */}

      {/* Settings Gear Icon */}
      <IconButton
        aria-label="Settings"
        icon={<SettingsIcon />}
        position="fixed"
        top={"4.5rem"}
        right={5}
        size="sm"
        onClick={onOpen}
        zIndex={10}
        colorScheme="teal"
        className="salawat-settings"
      />

      {/* Settings Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              {/* Arabic Font Size Slider */}
              <Box>
                <FormLabel>Arabic Font Size</FormLabel>
                <Slider
                  defaultValue={arabicFontSize}
                  min={16}
                  max={48}
                  step={1}
                  onChange={(val) => {
                    setArabicFontSize(val);
                    localStorage.setItem("arabicFontSize", val.toString());
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              {/* Translation Font Size Slider */}
              <Box>
                <FormLabel>Translation Font Size</FormLabel>
                <Slider
                  defaultValue={translationFontSize}
                  min={12}
                  max={32}
                  step={1}
                  onChange={(val) => {
                    setTranslationFontSize(val);
                    localStorage.setItem("translationFontSize", val.toString());
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              {/* Translation Font Size Slider */}
              <Box>
                <FormLabel>Counter Button Size</FormLabel>
                <Slider
                  defaultValue={counterButtonSize}
                  min={90}
                  max={270}
                  step={1}
                  onChange={(val) => {
                    setCounterButtonSize(val);
                    localStorage.setItem("counterButtonSize", val.toString());
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              {/* Transliteration Font Size Slider */}
              <Box>
                <FormLabel>Transliteration Font Size</FormLabel>
                <Slider
                  defaultValue={transliterationFontSize}
                  min={12}
                  max={32}
                  step={1}
                  onChange={(val) => {
                    setTransliterationFontSize(val);
                    localStorage.setItem(
                      "transliterationFontSize",
                      val.toString()
                    );
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              {/* Toggle Translation Visibility */}
              <Box>
                <FormLabel>Show Translation</FormLabel>
                <Switch
                  isChecked={showTranslation}
                  onChange={(e) => {
                    setShowTranslation(e.target.checked);
                    localStorage.setItem(
                      "showTranslation",
                      e.target.checked.toString()
                    );
                  }}
                />
              </Box>

              {/* Toggle Transliteration Visibility */}
              <Box>
                <FormLabel>Show Transliteration</FormLabel>
                <Switch
                  isChecked={showTransliteration}
                  onChange={(e) => {
                    setShowTransliteration(e.target.checked);
                    localStorage.setItem(
                      "showTransliteration",
                      e.target.checked.toString()
                    );
                  }}
                />
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Image Background */}
      {imageUrls.map((url, index) => (
        <MotionBox
          key={index}
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundImage={`url(${url})`}
          backgroundSize="cover"
          backgroundPosition="center"
          zIndex={-2}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: imageIndex === index ? 1 : 0,
            scale: imageIndex === index ? 1 : 1.08,
          }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 15, ease: "easeInOut" }, // Faster zoom effect
          }}
        />
      ))}

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
        zIndex={0}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        p={5}
        height="calc(100vh - 100px)" // Adjust height to leave space for the button
        overflowY="auto" // Scrollable content
        pb="100px" // Space for the button
      >
        <Heading
          as="h2"
          size="lg"
          mb={6}
          textAlign="center"
          color="white"
          className="salawat-title"
        >
          {salawat.title}
        </Heading>
        {/* <Stack spacing={4} mb={6} align="center">
              <Select
                width="auto"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                variant="outline"
                placeholder="Select Language"
                size="lg"
                color="white"
                borderColor="white"
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </Select>
            </Stack> */}
        {salawat.lines.map((line, index) => (
          <Box key={index} mb={6}>
            {renderArabicTextWithTooltips(line.arabic, line.words)}
            {showTranslation && (
              <Text
                mb={4}
                fontSize={`${translationFontSize}px`}
                color="gray.200"
                textAlign="center"
                className="salawat-translation"
              >
                {line.translations[language]}
              </Text>
            )}

            {showTransliteration && line.transliteration && (
              <Text
                mb={4}
                fontSize={`${transliterationFontSize}px`}
                color="gray.300"
                textAlign="center"
                className="salawat-transliteration"
              >
                {line.transliteration}
              </Text>
            )}

            {index < salawat.lines.length - 1 && (
              <Divider my={4} borderColor="gray.200" />
            )}
          </Box>
        ))}

        {/* Improved Button with Vibration */}
        <Suspense fallback={<div>Loading counter...</div>}>
          <ClientSideCounter salawatId={params.id} size={counterButtonSize} />
        </Suspense>
      </Box>

      <Joyride
        steps={tourSteps}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          beacon: {
            display: "none", // Hide the beacon completely
          },
        }}
      />
    </Box>
  );
}

export default withAuth(SalawatPage);
