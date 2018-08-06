-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 18 Decembre 2017 à 11:30
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `graphql-database`
--

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

CREATE TABLE IF NOT EXISTS `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `people`
--

INSERT INTO `people` (`id`, `firstName`, `lastName`, `email`, `createdAt`, `updatedAt`, `image`) VALUES
(1, 'Lavern', 'Hirthe', 'Lavern.Hirthe50@yahoo.com', '2017-07-17 07:10:24', '2017-07-17 07:10:24', 'http://placehold.it/250x250?text=Lavern'),
(2, 'Gustave', 'Nader', 'Gustave_Nader@yahoo.com', '2017-07-17 07:10:24', '2017-07-17 07:10:24', 'http://placehold.it/250x250?text=Gustave'),
(3, 'Idell', 'Lovecraft', 'Idell4@gmail.com', '2017-07-17 07:10:24', '2017-07-17 07:10:24', 'http://placehold.it/250x250?text=Idell'),
(4, 'Gina', 'Cassin', 'Gina.Cassin@gmail.com', '2017-07-17 07:10:24', '2017-07-17 07:10:24', 'http://placehold.it/250x250?text=Gina'),
(5, 'Lisa', 'Schubert', 'Lisa49@hotmail.com', '2017-07-17 07:10:24', '2017-07-17 07:10:24', 'http://placehold.it/250x250?text=Lisa'),
(6, 'Samu', 'Manoa', 'email.manoa@email.com', '2017-07-17 14:15:50', '2017-07-17 14:15:50', 'http://placehold.it/250x250?text=Samu'),
(7, 'Soba', 'Igen', 'surf@email.com', '2017-07-28 12:47:48', '2017-07-28 12:47:48', 'http://placehold.it/250x250?text=Soba');

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `published` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `pictures`
--

INSERT INTO `pictures` (`id`, `personId`, `title`, `url`, `published`, `createdAt`, `updatedAt`) VALUES
(1, 7, 'title 1', 'https://picsum.photos/516/415/?image=1', 1, '0000-00-00 00:00:00', '0'),
(2, 7, 'title 2', 'https://picsum.photos/516/415/?image=200', 1, '0000-00-00 00:00:00', '0'),
(3, 5, 'title 3', 'https://picsum.photos/516/415/?image=30', 1, '0000-00-00 00:00:00', '0'),
(4, 5, 'title 4', 'https://picsum.photos/516/415/?image=14', 1, '0000-00-00 00:00:00', '0'),
(5, 1, 'title 5', 'https://picsum.photos/516/415/?image=250', 1, '0000-00-00 00:00:00', '0');
(6, 2, 'title 6', 'https://picsum.photos/516/415/?image=60', 1, '0000-00-00 00:00:00', '0');
(7, 3, 'title 7', 'https://picsum.photos/516/415/?image=70', 1, '0000-00-00 00:00:00', '0');
(8, 4, 'title 8', 'https://picsum.photos/516/415/?image=85', 1, '0000-00-00 00:00:00', '0');
(9, 1, 'title 9', 'https://picsum.photos/516/415/?image=90', 1, '0000-00-00 00:00:00', '0');
(10, 6, 'title 10', 'https://picsum.photos/516/415/?image=125', 1, '0000-00-00 00:00:00', '0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
