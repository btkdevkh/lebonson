-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2021 at 12:37 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lebonson`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(90) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(90) NOT NULL,
  `quantity` int(11) NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `price`, `image`, `quantity`, `creationTimestamp`, `description`) VALUES
(39, 'Rode Podcaster', 177, '12682976_800.jpeg', 99, '2021-08-10 22:57:54', 'Micro dynamique large membrane USB.\n\nDirectivité: cardioïde\nRéponse en fréquence: 40 Hz - 14 kHz\nConvertisseurs A/N et N/A intégrés: 18 bit / 48 kHz\nSortie casque / ligne mini-jack 3,5 mm stéréo\nPince micro et câble USB de 3 mètres inclus\nGarantie constructeur 10 ans'),
(40, 'Millenium MX420', 348, '13993651_800.jpeg', 50, '2021-08-10 23:01:37', 'Millenium MX420 Studio Set BL.\n\nVersion Studio\nGrosse caisse 20\"x16\" (avec attache pour supports de toms)\nTom 10\"x08\"\nTom 12\"x09\"\nStand tom 14\"x14\"\nCaisse claire 14\"x5,5\"\nFûts 9 plis en peuplier/bouleau\nCercles caisse claire/toms en métal 1,5 mm\nCercles de la grosse caisse en bois de couleur identique aux fûts\nFinition: Rhodoïd\nCouleur: Blue Lining'),
(41, 'Rode NT-USB Mini', 95, '14892655_800.jpeg', 100, '2021-08-10 23:03:33', 'Rode NT-USB Mini.\n\nDiagramme polaire : cardioïde\nFiltre anti-pop intégré\nLimitation du niveau de pression acoustique : 121 dBA (@ 1% THD)\nGamme de fréquences : 20 - 20000 Hz\ninterface audio intégrée : 24 bits/48 kHz avec connexion USB-C\nConforme à la classe (aucune installation de pilote requise)\nSortie casque : mini-jack stéréo 3,5 mm avec réglage du volume\nMonitoring direct commutable pour un signal de microphone sans latence\nAlimentation électrique via USB\nBoîtier à charnière en acier avec revêtement noir mat\nBase de table magnétique amovible\nConfiguration requise : à partir de Win 10, à partir de Mac OS 10.12\nDimensions du microphone (L x P x H) : 54,5 x 43,9 x 108,1 mm\nDimensions base de la table (P x H) : 89,3 x 32,4 mm\nPoids : 585 g\nCâble USB inclus\n'),
(42, 'Yamaha P-45 B', 385, '9910221_800.jpeg', 50, '2021-08-10 23:06:16', 'Yamaha P-45 B.\nPiano de scène numérique.\n\n88 touches lestées\nClavier GHS (Graded Hammer Standard)\nGénérateur de sons AWM (échantillons stéréo)\nPolyphonie 64 voix max.\n10 sonorités\nMode Dual\nMode Duo\nEffets réverbération et chorus intégrés\nIntelligent Acoustic Control (IAC)\n10 morceaux de démonstration et 10 morceaux de piano\nUSB-to-Host pour connexion avec ordinateur ou appareil iOS\nMétronome intégré\nFonctions Tempo/Transpose et Tuning réglables\nSystème de haut-parleurs: 2 x 6 Watt\nSortie casque sur Jack 6,3 mm\nDimensions: 1326 x 154 x 295 mm\nPoids: 11,5 kg\nCouleur: Noir\nPédale de sustain, pupitre et bloc d\'alimentation PA-150B incl.\nSupport adapté Yamaha L85 optionnel non-fourni (N° d\'article 202248)'),
(43, 'Yamaha F310-PACK', 167, '16371858_800.jpeg', 100, '2021-08-10 23:10:01', 'Pack complet guitare folk Yamaha F310 avec tous ces accessoires. Parfait pour débuter dans les meilleurs conditions. Finition Natural'),
(44, 'Guitare Fender STRATOCASTER', 849, '75097_1.jpeg', 50, '2021-08-10 23:14:16', 'NOVENTA STRATOCASTER PF CRIMSON RED TRANSPARENT - FENDER\n\nCombinant un style Fender classique et des micros simple bobinage dynamiques type P90, la srie Noventa offre des sons puissants, une jouabilit moderne et un look bien rtro. La Noventa Stratocaster est une machine tonalit faisant autorit avec des micros simple bobinage Noventa, des contrles simples Master volume / Master Tone, et un chevalet Strat Hardtail. Sa beaut frappante est assortie la morsure des mdiums, aux aigus nets et aux graves doux des micros Noventa. Fabrique la commande et livre en Livre en Deluxe Gig Bag Fender.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
