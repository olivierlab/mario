//"use strict";

/*************************************************************
 *        Jeu de mario réalisé en algoscript                 *
 *     par Corention LE LIBOUX et Timothé DEVIN              *
 * Université de Nantes - L1 - Section MIP - Année 2017-2018 *
 *************************************************************/

//<editor-fold defaultstate="collapsed" desc="Constantes">
/**
 * Afficher les coordonnées du tableau
 * @type Boolean
 */
const SHOW_COORDINATE = false;
/**
 * Longueur de la map affichee a l'ecran
 * @type Number
 */
const LONGUEUR_MAP = 50;
/**
 * Hauteur de la map affichee a l'ecran
 * @type Number
 */
const HAUTEUR_MAP = 14;
/**
 * Largeur d'un bloc a l'ecran
 * @type Number
 */
const BLOC_WIDTH = 20;
/**
 * Hauteur d'un bloc a l'ecran
 * @type Number
 */
const BLOC_HEIGHT = 20;
/**
 * Largeur de mario petit
 * @type Number
 */
const MARIO_WIDTH_SMALL = BLOC_WIDTH;
/**
 * Hauteur de mario petit
 * @type Number
 */
const MARIO_HEIGHT_SMALL = BLOC_HEIGHT;
/**
 * Code touche vers le haut
 * @type Number
 */
const KEY_UP = 38;
/**
 * Code touche vers le bas
 * @type Number
 */
const KEY_DOWN = 40;
/**
 * Code touche vers la gauche
 * @type Number
 */
const KEY_LEFT = 37;
/**
 * Code touche vers la droite
 * @type Number
 */
const KEY_RIGHT = 39;
/**
 * Code pour indiquer qu'aucune touche n'est pressée
 * @type Number
 */
const NO_KEY = -1;
/**
 * Gravité
 * @type Number
 */
const GRAVITY = 800;
/**
 * Pas de deplacement horizontal quand on appuie sur une touche
 * @type Number
 */
const PAS_X = 10;
/**
 * Déplacement à gauche
 * @type Number
 */
const GAUCHE = -1;
/**
 * Déplacement à droite
 * @type Number
 */
const DROITE = 1;
/**
 * Vitesse au début du saut de mario
 * @type Number
 */
const V0 = 400;
/**
 * nombre maximum de vie de mario dans une partie
 * @type Int
 */
const NB_VIE_MARIO = 3;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Var globales">
/**
 * Je ne sais pas a quoi cela sert
 * @type Boolean
 */
turtleEnabled = false;
/**
 * démarre le jeu ou change de map
 * @type Boolean
 */
var start_game = true;
/**
 * lorsque mario n'a plus de vie game_over renvoie true
 * @returns Boolean
 */
var game_over = false;
/**
 * Indicateur de présence du son
 * @type Boolean
 */
var play_sound = true;
/**
 * Les différentes musiques de mario
 * @type Array
 */
var son = {
    'fond' : 'http://olivier.leliboux.free.fr/mario/son/musique_mario_fond.wav',
    'fin_niveau' : 'http://olivier.leliboux.free.fr/mario/son/fin_de_niveau.wav',
    'vie_perdue' : 'http://olivier.leliboux.free.fr/mario/son/vie_perdue.wav',
    'game_over' : 'http://olivier.leliboux.free.fr/mario/son/game_over.wav'
};
/**
 * Musique de fond
 * @type audio
 */
var musique_fond = ChargerSon(son['fond']);
musique_fond.loop = true;
/**
 * Musique de fin de niveau
 * @type audio
 */
var musique_fin_niveau = ChargerSon(son['fin_niveau']);
/**
 * Musique de jeu perdu
 * @type audio
 */
var musique_game_over = ChargerSon(son['game_over']);
/**
 * Musique de perte de vie
 * @type audio
 */
var musique_vie_perdue = ChargerSon(son['vie_perdue']);
// si le son est actif
if (play_sound) {
    musique_fond.play();
}
/**
 * Tableau contenant les maps
 * @type Array
 */
var maps = ['map0.txt',
            'map1.txt', 
            'map2.txt',
            'map3.txt'];
/**
 * Numéro de la map
 * @type Number
 */
var num_map = 0;
/**
 * Caractere representant une cellule vide
 * @type String
 */
var cellule_vide = "~";
/**
 * tableau liant un caractere de la map a sa representation graphique
 * @type Array
 */
var bloc = {
    '~' : 'http://olivier.leliboux.free.fr/mario/img/carre-blanc-300x300.png', // bloc vide
    '~~' : 'http://olivier.leliboux.free.fr/mario/img/carre-gris.png', // bloc vide
    '?' : 'http://olivier.leliboux.free.fr/mario/img/cube_interrogation.png', // cube surprise
    '!' : 'http://olivier.leliboux.free.fr/mario/img/cube_interrogation.png', // cube surprise après ramassage de la pièce
    'b' : 'http://olivier.leliboux.free.fr/mario/img/rbricks_large_shop_preview.png', // brique
    '0' : 'http://olivier.leliboux.free.fr/mario/img/cube_interrogation.png', // ?
    'B' : 'http://olivier.leliboux.free.fr/mario/img/roche.jpg', // Bloc de roche
    't' : 'http://olivier.leliboux.free.fr/mario/img/green-pipe.png', // tube
    '1' : 'http://olivier.leliboux.free.fr/mario/img/tuyau_haut_gauche.png',
    '2' : 'http://olivier.leliboux.free.fr/mario/img/tuyau_haut_droit.png', 
    '3' : 'http://olivier.leliboux.free.fr/mario/img/tuyau_bas_gauche.png', 
    '4' : 'http://olivier.leliboux.free.fr/mario/img/tuyau_bas_droit.png',
    '5' : 'http://olivier.leliboux.free.fr/mario/img/logo_0_0.png',
    '6' : 'http://olivier.leliboux.free.fr/mario/img/logo_0_1.png',
    '7' : 'http://olivier.leliboux.free.fr/mario/img/logo_1_0.png',
    '8' : 'http://olivier.leliboux.free.fr/mario/img/logo_1_1.png',
    'c' : 'http://olivier.leliboux.free.fr/mario/img/champignon.png', // champignon
    '_' : 'http://olivier.leliboux.free.fr/mario/img/sol.png', // sol
    'p' : 'http://olivier.leliboux.free.fr/mario/img/piece_or.jpg' // piece d'or
};
/**
 * Images du jeu
 * @type Array
 */
var images = {
    'deco' : 'http://olivier.leliboux.free.fr/mario/img/mario_deco2.png', // image du début du jeu
    'winner' : 'http://olivier.leliboux.free.fr/mario/img/1up.jpg', // fin de niveau
    'level' : 'http://olivier.leliboux.free.fr/mario/img/level.jpg', // nouveau niveau
    'game_over' : 'http://olivier.leliboux.free.fr/mario/img/game_over.png', //game over = 0 vies
    'vie' : 'http://olivier.leliboux.free.fr/mario/img/coeur.jpg', // image du coeur pour les vies
    'piece' : 'http://olivier.leliboux.free.fr/mario/img/piece_or.jpg'
};
/**
 * Les differentes representations de mario
 * @type Array
 */
var mario = {
    'petit' : 'http://olivier.leliboux.free.fr/mario/img/mario_petit.png',
    'petit_gauche' : 'http://olivier.leliboux.free.fr/mario/img/mario_petit_gauche.png',
    'petit_saute' : 'http://olivier.leliboux.free.fr/mario/img/mario_petit_saute.png',
    'petit_saute_gauche' : 'http://olivier.leliboux.free.fr/mario/img/mario_petit_saute-gauche.png',
    'grand' : 'http://olivier.leliboux.free.fr/mario/img/mario_grand.png',
    'grand_gauche' : 'http://olivier.leliboux.free.fr/mario/img/mario_grand_gauche.png'
};
/**
 * Liste des personnages par zone de la map
 * Structure :
 *   personnages = { num_map : { num_perso : {"type" : "a", "x" : 0, "y" : 0}, 
 *                               num_perso : {"type" : "b", "x" : 1, "y" : 1}, ... 
 *                             } 
 *                 } 
 * Exemple :
 *   personnages = { 0 : { 0 : {"type" : "a", "x" : 0, "y" : 0}, 
 *                         1 : {"type" : "b", "x" : 1, "y" : 1}, ... 
 *                       },
 *                   1 : { 0 : {"type" : "c", "x" : 0, "y" : 0}, 
 *                         1 : {"type" : "d", "x" : 1, "y" : 1}, ... 
 *                       }
 *                 };
 * @type Array
 */
var personnages = {};
/**
 * Tableau mémorisant les touches actives du clavier
 * @type Array
 */
var isToucheActive = {
    'gauche' : false,
    'droite' : false,
    'haut' : false,
    'bas' : false
};
/**
 * zone de la map a afficher (0 = 1er ecran, 1 = 2eme ecran, ...)
 * @type Number
 */
var zone_map = 0;
/**
 * Nombre d'image par seconde
 * @type Number
 */
FrameRate = 30;
/**
 * Top depart du jeu en ms
 * @type Number
 */
var top_depart_jeux = Date.now();
/**
 * Indique si mario fait un saut parabolique (true) ou une chute libre (false)
 * @type Boolean
 */
var isMarioSautParabolique = false;
/**
 * indique si mario est sur le sol (true) ou en train de sauter (false)
 * @type Boolean
 */
var isMarioSurLeSol = false;
/**
 * tableau 2D qui contient la map
 * @type Array
 */
var tableau_map;
/**
 * Position du coin supérieur gauche de mario en x
 * @type Number
 */
var mario_sg_x = 0;
/**
 * Position du coin supérieur gauche de mario en y
 * @type Number
 */
var mario_sg_y = 0;
/**
 * Position du coin inférieur droit de mario en x
 * @type Number
 */
var mario_id_x = mario_sg_x + MARIO_WIDTH_SMALL;
/**
 * Position du coin inférieur droit de mario en y
 * @type Number
 */
var mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
/**
 * Position precedente du coin supérieur gauche de mario en x
 * @type Number
 */
var mario_sg_x_prec = mario_sg_x;
/**
 * Position precedente du coin supérieur gauche de mario en y
 * @type Number
 */
var mario_sg_y_prec = mario_sg_y;
/**
 * Position precedente du coin inférieur droit de mario en x
 * @type Number
 */
var mario_id_x_prec = mario_id_x;
/**
 * Position precedente du coin inférieur droit de mario en y
 * @type Number
 */
var mario_id_y_prec = mario_id_y;
/**
 * Vitesse de mario horizontalement (déplacement vers la droite si >0, déplacement vers la gauche si <0)
 * @type Number
 */
var vitesse_mario_x = 0;
/**
 * Vitesse de mario verticalement (déplacement vers le bas si >0, déplacement vers le haut si <0)
 * @type Number
 */
var vitesse_mario_y = 0;
/**
 * Ligne du coin supérieur gauche de mario dans la map
 * @type Number
 */
var mario_sg_ligne = 0;
/**
 * Colonne du coin supérieur gauche de mario dans la map
 * @type Number
 */
var mario_sg_colonne = 0;
/**
 * Ligne du coin inférieur droit de mario dans la map
 * @type Number
 */
var mario_id_ligne = mario_sg_ligne + 1;
/**
 * Colonne du coin inférieur droit de mario dans la map
 * @type Number
 */
var mario_id_colonne = mario_sg_colonne + 1;
/**
 * Nombre de maps chargées
 * @type Number
 */
var nb_maps = 0;
/**
 * Décalage horizontal pour pointer sur la bonne map
 * @type Number
 */
var offset_tableau = zone_map * LONGUEUR_MAP;
/***
 * Sens de déplacement
 * @type Number|DROITE|GAUCHE
 */
var sens = DROITE;
/**
 * Timestamp qui marque le top depart de la chute ou du saut de mario
 * @type int
 */
var top_depart_chute_mario;
/**
 * indicateur qui marque le lancement du saut ou de la chute de mario
 * @type boolean
 */
var initialiser_saut_mario = true;
/**
 * Position initiale en y de mario au départ du saut
 * @type Number
 */
var mario_sg_y_initiale;
/**
 * Indique si mario a rencontré un obstacle verticalement
 * @type Boolean
 */
var mario_is_obstacle_V = false;
/**
 * Indique si mario a rencontré un obstacle horizontalement
 * @type Boolean
 */
var mario_is_obstacle_H = false;
/**
 * Indique un changement de map
 * @type Boolean
 */
var changeMap = false;
/**
 * Indicateur de passage au niveau suivant
 * @type Boolean
 */
var change_niveau = false;
/**
 * Indicateur de changement d'étape à la fin d'un niveau
 * @type String
 */
var etape_chgt_niveau = "initiale";
/**
 * mémorisation de l'instant initial
 * @type int
 */
var instant_initial = Date.now();
/**
 * nombre de vie de mario au début du jeu
 * @type Int
 */
var nbVieRestante = NB_VIE_MARIO;
/**
 * Nombre de pièces gagnées par mario
 * @type Int
 */
var nb_piece = 0;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Fonctions">

/**
 * Initialisation des variables aux conditions de départ du jeu
 * @returns {undefined}
 */
function initialiserJeu() {
    zone_map = 0;
    isMarioSautParabolique = false;
    isMarioSurLeSol = false;
    mario_sg_x = 0;
    mario_sg_y = 0;
    vitesse_mario_x = 0;
    vitesse_mario_y = 0;
    mario_id_x = mario_sg_x + MARIO_WIDTH_SMALL;
    mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
    mario_sg_x_prec = mario_sg_x;
    mario_sg_y_prec = mario_sg_y;
    mario_id_x_prec = mario_id_x;
    mario_id_y_prec = mario_id_y;
    mario_sg_ligne = 0;
    mario_sg_colonne = 0;
    mario_id_ligne = mario_sg_ligne + 1;
    mario_id_colonne = mario_sg_colonne + 1;
    offset_tableau = zone_map * LONGUEUR_MAP;
    sens = DROITE;
    initialiser_saut_mario = true;
}

/**
 * Lire la chaine de caractere map et la stocker dans un tableau. Charger les personnages.
 * @param {string} map La chaine de caractere contenant la map
 * @returns {Array} Le tableau contenant la map
 */
function chargerTableau(map) {
    var T = [];
    // recuperation des lignes de la map
    var lignes = map.split("\n"); //split= separateur de chaines de caracteres dans un tableau
    
    var ligne = "";
    var carac = "";    
    // parcours des lignes
    for (var lig = 0; lig < lignes.length; lig++) { //length=longueur
        ligne = lignes[lig];
        T[lig] = [];
        // ajout des donnees de la ligne dans le tableau
        for(var col = 0; col < ligne.length; col++) {
            carac = ligne.substring(col,col+1);//substring= retourne une sous chaine de la chaine courante entre un indice de debut et un indice de fin            
            T[lig][col] = recupererPersonnages(lig, col, carac);
        }
    }
    // calcul du nombre de maps contenues dans le tableau
    nb_maps = Math.floor(ligne.length / LONGUEUR_MAP);
    //AfficherTableau(T);
    //console.log(personnages);
    return T;
}

/**
 * Initialiser le tableau des personnages
 * @param {int} lig
 * @param {int} col
 * @param {string} carac
 * @returns {String} Le caractère à insérer dans la map
 */
function recupererPersonnages(lig, col, carac) {
    var carac_map = carac;

    switch (carac) {
        case "c": // champignon
            var zone_map_perso = Math.floor(col / LONGUEUR_MAP);
            var num_perso = (typeof personnages[zone_map_perso] === "undefined" ? 0 : Object.keys(personnages[zone_map_perso]).length);

            if (num_perso === 0) {
                personnages[zone_map_perso] = {};
            }
            var x = (col - zone_map_perso * LONGUEUR_MAP) * BLOC_WIDTH;
            var y = lig * BLOC_HEIGHT;
            
            ajouterPersonnage(zone_map_perso, num_perso, carac, x, y, lig, col, (Math.random() > 0.5 ? DROITE : GAUCHE));
            
            carac_map = "~"; // perso remplacer par un bloc vide sur la map
            break;

        case "p": // piece d'or
            var zone_map_perso = Math.floor(col / LONGUEUR_MAP);
            var num_perso = (typeof personnages[zone_map_perso] === "undefined" ? 0 : Object.keys(personnages[zone_map_perso]).length);

            if (num_perso === 0) {
                personnages[zone_map_perso] = {};
            }
            var x = (col - zone_map_perso * LONGUEUR_MAP) * BLOC_WIDTH;
            var y = lig * BLOC_HEIGHT;
            
            ajouterPersonnage(zone_map_perso, num_perso, carac, x, y, lig, col, 0);
            
            carac_map = "~"; // perso remplacer par un bloc vide sur la map
            break;

        default:
            break;
    }
    
    return carac_map;
}

/**
 * Ajouter un personnage dans le tableau des personnages
 * @param {int} zone_map_perso Zone de la map
 * @param {int} num_perso Numéro du personnage
 * @param {string} carac Caractère représentant le personnage
 * @param {int} x Abscisse
 * @param {int} y Ordonnée
 * @param {int} lig Ligne
 * @param {int} col Colonne
 * @param {int} sens Sens de déplacement : -1 = GAUCHE, 0 = AUCUN, 1 = DROITE
 */
function ajouterPersonnage(zone_map_perso, num_perso, carac, x, y, lig, col, sens) {
    personnages[zone_map_perso][num_perso] = {
        "type" : carac,
        "sg_x_prec" : x,
        "sg_x" : x,
        "sg_y_prec" : y,
        "sg_y" : y,
        "id_x" : x + BLOC_WIDTH,
        "id_y" : y + BLOC_HEIGHT,
        "id_x_prec" : x + BLOC_WIDTH,
        "id_y_prec" : y + BLOC_HEIGHT,
        "sg_ligne" : lig,
        "sg_colonne" : col,
        "id_ligne" : lig + 1,
        "id_colonne" : col + 1,
        "sens" : sens,
        "is_alive" : true
    };    
}

/**
 * Effaçage des personnages de la map en cours
 * @param {int} zone Zone de la map
 */
function effacerPersonnages(zone) {
    var leperso;
    // Boucle d'effaçage
    for (var personnage in personnages[zone]) {
        leperso = personnages[zone][personnage];
        if (leperso["is_alive"] && leperso["sens"] !== 0) {
            // effacer position prec du personnage
            DrawImage(bloc[cellule_vide], leperso["sg_x_prec"], leperso["sg_y_prec"], BLOC_WIDTH, BLOC_HEIGHT);
        }
    }
}

/**
 * Affichage des personnages de la map en cours
 */
function afficherPersonnages() {
    var leperso;
    // Boucle d'affichage : séparation pour éviter qu'un personnage en efface un autre quand ils se croisent
    for (var personnage in personnages[zone_map]) {
        leperso = personnages[zone_map][personnage];
        if (leperso["is_alive"]) {
            // afficher nouvelle eposition du personnage
            DrawImage(bloc[leperso["type"]],leperso["sg_x"], leperso["sg_y"], BLOC_WIDTH, BLOC_HEIGHT);
        }
    }
}

/**
 * Convertir le tableau en affichage graphique
 * @param {array} tableau Le tableau contenant la map
 * @param {int} zone La zone de la map a afficher
 * @returns {undefined}
 */
function afficherMap(tableau, zone) {
    Effacer();
    
    var ligne, char, url, x, y;
    for (var lig = 0; lig < tableau.length; lig++) { //length=longueur
        ligne = tableau[lig];
        y = lig * BLOC_HEIGHT;
        // on affiche les donnees d'une zone
        for(var col = zone * LONGUEUR_MAP; col < (zone + 1) * LONGUEUR_MAP && col < ligne.length; col++) {
            //console.log(tableau[lig][col]);
            char = tableau[lig][col];
            x = (col - zone * LONGUEUR_MAP) * BLOC_WIDTH;            
            url = (typeof bloc[char] === "undefined" ? bloc['_'] : bloc[char]); //le triple egal signifie une egalite stricte
            DrawImage(url, x, y, BLOC_WIDTH, BLOC_HEIGHT);
        }
        // affiche les numéros de ligne
        if (SHOW_COORDINATE) {
            Texte(x + BLOC_WIDTH, y + 2 * BLOC_HEIGHT / 3, lig, "#000000");
        }
    }
    // affiche les numéros de colonne
    if (SHOW_COORDINATE) {
        lig = tableau.length;
        y = lig * BLOC_HEIGHT;
        for(var col = zone * LONGUEUR_MAP; col < (zone + 1) * LONGUEUR_MAP; col++) {
            x = (col - zone * LONGUEUR_MAP) * BLOC_WIDTH;
            Texte(x + BLOC_WIDTH / 3, y + BLOC_HEIGHT, col, "#000000");
        }
    }
}

/**
 * Animer la chute et le saut de mario dans le jeu
 */
function faireSauterMario() {
    if (initialiser_saut_mario) {
        initialiser_saut_mario = false;
        top_depart_chute_mario = Date.now();
        mario_sg_y_initiale = mario_sg_y;
    }
    var temps = (Date.now() - top_depart_chute_mario) / 1000;
    
    if (isMarioSautParabolique) {
        mario_sg_y = Math.floor(GRAVITY * Math.pow(temps, 2) / 2 - V0 * temps) + mario_sg_y_initiale;
        vitesse_mario_y = GRAVITY * temps - V0;
    } else { // chute libre
        mario_sg_y = Math.floor(GRAVITY * Math.pow(temps, 2) / 2) + mario_sg_y_initiale;
        vitesse_mario_y = GRAVITY * temps;
    }
    
    // Il faut limiter la vitesse de chute sinon mario passe à travers les blocs
    // mario ne peut se déplacer que d'un bloc maximum par itération
    if (Math.abs(mario_sg_y - mario_sg_y_prec) > MARIO_HEIGHT_SMALL) {
        mario_sg_y = Math.floor(mario_sg_y_prec + Math.sign(vitesse_mario_y) * MARIO_HEIGHT_SMALL * 9 / 10);
    }

    deplacerMario();
}

/**
 * Deplacer mario dans le jeu
 */
function deplacerMario () {
    detecterRelachementTouche();
    
    detecterAppuiSurTouche();
    
    // on ne fait rien quand il ne se passe rien !
    if (!isMarioSurLeSol || isOneToucheActive()) {
        keyDeplacer();

        setMarioLigneColonne();

        afficherMario();
    }
    
    interactionMarioPersonnages();
}

/**
 * Vérification de l'intéraction entre mario et les personnages
 */
function interactionMarioPersonnages() {
    var leperso;
    // Boucle d'affichage : séparation pour éviter qu'un personnage en efface un autre quand ils se croisent
    for (var personnage in personnages[zone_map]) {
        leperso = personnages[zone_map][personnage];
        if (typeof leperso !== "undefined" && leperso["is_alive"]) {
            // vérifier intéraction personnage - mario
            if (Math.abs(mario_sg_x - leperso["sg_x"]) < BLOC_WIDTH && Math.abs(mario_sg_y - leperso["sg_y"]) < BLOC_WIDTH ) {
                leperso["is_alive"] = false; // mort du personnage
                
                // gestion du game play en fonction du perso
                switch (leperso["type"]) {
                    case "c":
                        // Retour au début du jeu
                        initialiserJeu();
                        zone_map = 0;
                        changeMap = true;
                        nbVieRestante--;
                        
                        if (nbVieRestante >= 1) {
                            playNewSound(musique_vie_perdue);
                        }
                        isGameOver();
                        break;
                        
                    case "p":
                        // Effacer la pièce : dessiner le bloc de fond ne marche pas ! 
                        // Il faut obligatoirement une autre image. On a créé une image très
                        // lègèrement grisée. On ne voit aucune différence à l'oeil nu.
                        DrawImage(bloc['~~'], leperso["sg_x"], leperso["sg_y"], BLOC_WIDTH, BLOC_HEIGHT);
                        ramasser_piece();
                        // bidouille : sans le timeout, mario ne s'affiche pas !
                        setTimeout(function(){ afficherMario(); }, 50);
                        break;
                        
                    default:
                        
                        break;
                }

                break;
            }
        }
    }
}

/**
 * Déplacement des personnages de la map en cours
 */
function deplacerPersonnages () {
    var leperso;
    
    for (var personnage in personnages[zone_map]) {
        leperso = personnages[zone_map][personnage];

        // on ne déplace que ce qui est vivant et que ce qui bouge
        if (leperso["is_alive"] && leperso["sens"] !== 0) {
            // Mémorisation de la position précédente
            leperso["sg_x_prec"] = leperso["sg_x"];
            leperso["sg_y_prec"] = leperso["sg_y"];

            // Nouvelle position
            leperso["sg_x"] += leperso["sens"] * BLOC_WIDTH / 10;
            leperso["sg_y"] += 0;

            setPersoLigneColonne(leperso);

            // détection d'obstacle (mur ou trou) et changement de sens
            // repositionner perso horizontalement pour qu'il ne pénètre pas le bloc
            if ( isObstacleHorizontalPerso(leperso) ) {
                leperso["sg_x"] = (leperso["sens"] > 0 ? leperso["sg_colonne"] : leperso["id_colonne"]) * BLOC_WIDTH;
                leperso["id_x"] = leperso["sg_x"] + BLOC_WIDTH;
                setPersoLigneColonne(leperso);
                leperso["sens"] = -leperso["sens"];
            }
        }
    }
}

/**
 * Détecter le relachement de touche
 * @returns {undefined}
 */
function detecterRelachementTouche() {
    // est déclanché UNIQUEMENT quand on lache une touche !
    window.onkeyup = function (e) {
        var key = e.keyCode || e.which; // détection de la touche relachée
        
        switch (key) {
           case KEY_RIGHT:
               isToucheActive['droite'] = false;
               break;

           case KEY_LEFT:
               isToucheActive['gauche'] = false;
               break;

           case KEY_UP:
               isToucheActive['haut'] = false;
               break;

           case KEY_DOWN:
               isToucheActive['bas'] = false;
               break;

           default:
               break;
        }
    };    
}

/**
 * Détecter l'appui sur une touche
 * @returns {undefined}
 */
function detecterAppuiSurTouche() {
    // est déclanché UNIQUEMENT quand on appuie une touche !
    window.onkeydown = function (e) {        
        var key = e.keyCode || e.which; // détection de la touche appuyée
        
        switch (key) {
           case KEY_RIGHT:
               isToucheActive['droite'] = true;               
               break;

           case KEY_LEFT:
               isToucheActive['gauche'] = true;
               break;

           case KEY_UP:
               // cette touche doit être désactivée uniquement quand mario est sur le sol sinon il saute sans cesse
               if(isMarioSurLeSol) {
                   isToucheActive['haut'] = true;
               }
               break;

           case KEY_DOWN:
               isToucheActive['bas'] = true;
               break;

           case 81: // touche q
               Initialiser();
               break;

           default:
               break;
        }
    };   
}

/**
 * Vérifie si une touche est active
 * @returns {Boolean} True si une touche est active, false sinon
 */
function isOneToucheActive() {
    for (var key in isToucheActive) {
        if (isToucheActive[key]) {
            return true;
        }
    }
    return false;
}

/**
 * Déplace mario en fonction de la touche appuyée
 * @returns {undefined}
 */
function keyDeplacer() {

    if (isToucheActive['droite']) {
         sens = DROITE;
         mario_sg_x += PAS_X;
         vitesse_mario_x = PAS_X * FrameRate;
    }
    
    if (isToucheActive['gauche']) {
        sens = GAUCHE;
        mario_sg_x -= PAS_X;
        vitesse_mario_x = -PAS_X * FrameRate;
    }
    
    if (isToucheActive['haut']) {
        // cette touche doit être désactivée uniquement quand mario est sur le sol sinon il saute sans cesse
        if(isMarioSurLeSol) {
             isMarioSurLeSol = false;
             initialiser_saut_mario = true;
             mario_sg_y -= 1;
        }
    }
    
    if (isToucheActive['bas']) {
        //mario_sg_y += PAS_X;
        //vitesse_mario_y = PAS_X * FrameRate;
        //isMarioSurLeSol = false;
    }

    mario_id_x = mario_sg_x + MARIO_WIDTH_SMALL;
    mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
}

/**
 * Afficher mario et détecter les obstacles
 */
function afficherMario() {
    // effacer position precedente de mario
    DrawImage(bloc[cellule_vide], mario_sg_x_prec, mario_sg_y_prec, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
    
    // afficher mario
    var isObstacleH = isObstacleHorizontal();
    var isObstacleV = isObstacleVertical();
    
    if (isObstacleH || isObstacleV) {
        // repositionner mario horizontalement pour qu'il ne pénètre pas le bloc
        if (isObstacleH) {
            mario_sg_x = (vitesse_mario_x > 0 ? mario_sg_colonne : mario_id_colonne) * BLOC_WIDTH;
            mario_id_x = mario_sg_x + MARIO_WIDTH_SMALL;
        }

        // repositionner mario verticalement pour qu'il ne pénètre pas le bloc
        if (isObstacleV) {
            mario_sg_y = (vitesse_mario_y > 0 ? mario_sg_ligne : mario_id_ligne) * BLOC_HEIGHT;
            mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
        }
        
        setMarioLigneColonne();

        // on reverifie si mario est dans le vide sinon il ne tombe pas quand il touche un obstacle vertical
        isObstacleV = isObstacleVertical();        
    }

    var url_mario = (sens === DROITE 
                         ? (isMarioSurLeSol || isObstacleV ? mario['petit'] : mario['petit_saute']) 
                         : (isMarioSurLeSol || isObstacleV ? mario['petit_gauche'] : mario['petit_saute_gauche']));
    // dessiner le nouveau mario
    DrawImage(url_mario, mario_sg_x, mario_sg_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
    
    mario_sg_x_prec = mario_sg_x;
    mario_sg_y_prec = mario_sg_y;
    // ne sert que pour information !
    mario_is_obstacle_V = isObstacleV;
    mario_is_obstacle_H = isObstacleH;
   
    // détection de l'arrivée de mario dans le jeu ou de la chute d'un bloc
    if (!isMarioSautParabolique && isObstacleV) {
        isMarioSautParabolique = true;
        initialiser_saut_mario = true;
    }

    var isMarioSurLeSolAvant = isMarioSurLeSol;
    
    isMarioSurLeSol = isObstacleV && (vitesse_mario_y >= 0);
   
    // mario marche dans le vide || la tête de mario touche un obstacle
    if ((isMarioSurLeSolAvant && !isMarioSurLeSol) || (isObstacleV && !isMarioSurLeSol)) {
        isMarioSautParabolique = false;
        initialiser_saut_mario = true;
    }
    
    showInformation();

    vitesse_mario_x = 0;
    vitesse_mario_y = 0;
}

/**
 * Recalcule la valeur de la ligne et de la colonne dans laquelle se trouve mario
 * pour les points supérieur gauche et inférieur droit
 * @returns {undefined}
 */
function setMarioLigneColonne() {
    //<editor-fold defaultstate="collapsed" desc="Recalcul des lignes et colonnes">
    // Math.floor retourne la valeur d'un nombre arrondi à l'entier inférieur
    mario_sg_ligne = Math.floor(mario_sg_y / MARIO_HEIGHT_SMALL);
    var reste_sg_ligne = mario_sg_y % MARIO_HEIGHT_SMALL;
    mario_id_ligne = mario_sg_ligne + (reste_sg_ligne === 0  ? 0 : 1);
    
    mario_sg_colonne = Math.floor(mario_sg_x / MARIO_WIDTH_SMALL);
    var reste_sg_colonne = mario_sg_x % MARIO_WIDTH_SMALL;
    mario_id_colonne = mario_sg_colonne + (reste_sg_colonne === 0  ? 0 : 1);
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Analyse des sorties de map">
    if (mario_sg_ligne < 0) { // sortie de map en haut => Mario reste collé au plafond
        mario_sg_ligne = 0;
        mario_id_ligne = mario_sg_ligne;
        mario_sg_y = 0;
        mario_id_y = MARIO_HEIGHT_SMALL;
    } else if (mario_id_ligne >= HAUTEUR_MAP) { // sortie de map en bas => recommencer le jeu
        initialiserJeu();
        zone_map = 0;
        changeMap = true;
        nbVieRestante--;
        
        if (nbVieRestante >= 1) {
            playNewSound(musique_vie_perdue);
        }
        isGameOver();
    }

    if (mario_sg_colonne < 0) { // sortie de map à gauche
        if (zone_map > 0) { // changement de map
            zone_map--;
            changeMap = true;
            offset_tableau = zone_map * LONGUEUR_MAP;
            // positionnement en fin de map
            mario_id_colonne = LONGUEUR_MAP - 1;
            mario_id_x = (mario_id_colonne + 1) * MARIO_WIDTH_SMALL;
            mario_sg_colonne = mario_id_colonne;
            mario_sg_x = mario_id_x - MARIO_WIDTH_SMALL;
        } else { // début de map
            mario_sg_colonne = 0;
            mario_id_colonne = 0;
            mario_sg_x = 0;
            mario_id_x = MARIO_WIDTH_SMALL;
        }
    } else if (mario_id_colonne >= LONGUEUR_MAP) { // sortie de map à droite
        if (zone_map + 1 < nb_maps) { // changement de map
            zone_map++;
            changeMap = true;
            offset_tableau = zone_map * LONGUEUR_MAP;
            // positionnement en début de map
            mario_sg_colonne = 0;
            mario_id_colonne = 0;
            mario_sg_x = 0;
            mario_id_x = MARIO_WIDTH_SMALL;
        } else { // fin de map
            mario_id_colonne = LONGUEUR_MAP - 1;
            mario_id_x = (mario_id_colonne + 1) * MARIO_WIDTH_SMALL;
            mario_sg_colonne = mario_id_colonne;
            mario_sg_x = mario_id_x - MARIO_WIDTH_SMALL;
            // changement de map
            num_map++;
            nbVieRestante++;
            // on recommence au départ si on atteint la dernière map
            if (num_map >= maps.length) {
                num_map = 0;
                start_game = true;
                instant_initial = Date.now();
            } else {
                change_niveau = true;
            }
        }
    }
    //</editor-fold>
}

/**
 * Jouer une musique et mettre la musique de fond en pause
 * @param {object} musique_to_play Musique à jouer
 * @returns {int} Durée du morceau de musique joué
 */
function playNewSound(musique_to_play) {
    var duree = 0;
    if (play_sound) {
        musique_fond.pause();
        musique_to_play.play();

        duree = (musique_to_play.duration - musique_to_play.currentTime) * 1000 ;

        setTimeout(function() { 
            musique_fond.play();
        }, duree);
    }
    return duree;
}

/**
 * Recalcule la valeur de la ligne et de la colonne dans laquelle se trouve le personnage
 * @param {Array} perso Le personnage
 * pour les points supérieur gauche et inférieur droit
 */
function setPersoLigneColonne(perso) {
    //<editor-fold defaultstate="collapsed" desc="Recalcul des lignes et colonnes">
    // Math.floor retourne la valeur d'un nombre arrondi à l'entier inférieur
    perso["sg_ligne"] = Math.floor(perso["sg_y"] / BLOC_HEIGHT);
    var reste_sg_ligne = perso["sg_y"] % BLOC_HEIGHT;
    perso["id_ligne"] = perso["sg_ligne"] + (reste_sg_ligne === 0  ? 0 : 1);
    
    perso["sg_colonne"] = Math.floor(perso["sg_x"] / BLOC_WIDTH);
    var reste_sg_colonne = perso["sg_x"] % BLOC_WIDTH;
    perso["id_colonne"] = perso["sg_colonne"] + (reste_sg_colonne === 0  ? 0 : 1);
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Analyse des sorties de map">
    if (perso["sg_ligne"] < 0) { // sortie de map en haut => perso reste collé au plafond
        perso["sg_ligne"] = 0;
        perso["id_ligne"] = perso["sg_ligne"];
        perso["sg_y"] = 0;
        perso["id_y"] = BLOC_HEIGHT;
    } else if (perso["id_ligne"] >= HAUTEUR_MAP) { // sortie de map en bas => le perso meurt
        perso["is_alive"] = false;
    }

    if (perso["sg_colonne"] < 0) { // sortie de map à gauche
        perso["sens"] = -perso["sens"];
    } else if (perso["id_colonne"] >= LONGUEUR_MAP) { // sortie de map à droite
        perso["sens"] = -perso["sens"];
    }
    //</editor-fold>
}

/**
 * Détection d'obstacle horizontal
 * @returns {Boolean} True alors obstacle horizontal, false sinon
 */
function isObstacleHorizontal() {
    var response = false;
    
    if (vitesse_mario_x > 0 && vitesse_mario_y === 0) { // vers la droite
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] !== cellule_vide) 
                || (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] !== cellule_vide);
    } else if (vitesse_mario_x !== 0 && vitesse_mario_y < 0) { // vers le haut à droite ou à gauche
        response = (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
                || (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide);
    } else if (vitesse_mario_x !== 0 && vitesse_mario_y > 0) { // vers le bas à droite ou à gauche
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
                || (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide);
    } else if (vitesse_mario_x < 0 && vitesse_mario_y === 0) { // vers la gauche
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide) 
                || (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide);
    }

    return response;
}

/**
 * Détection d'obstacle horizontal pour un personnage
 * @param {type} perso Le personnage
 * @returns {Boolean} True alors obstacle horizontal, false sinon
 */
function isObstacleHorizontalPerso(perso) {
    var response = false;
    
    if (perso["sens"] > 0 ) { // vers la droite
        response = (tableau_map[perso["sg_ligne"]][offset_tableau + perso["id_colonne"]] !== cellule_vide) 
                || (tableau_map[perso["id_ligne"]][offset_tableau + perso["id_colonne"]] !== cellule_vide)
                || (tableau_map[perso["id_ligne"]+1][offset_tableau + perso["id_colonne"]] === cellule_vide);
    } else { // vers la gauche
        response = (tableau_map[perso["sg_ligne"]][offset_tableau + perso["sg_colonne"]] !== cellule_vide) 
                || (tableau_map[perso["id_ligne"]][offset_tableau + perso["sg_colonne"]] !== cellule_vide)
                || (tableau_map[perso["id_ligne"]+1][offset_tableau + perso["sg_colonne"]] === cellule_vide);
    }

    return response;
}

/**
 * Détection d'obstacle vertical
 * @returns {Boolean} True alors obstacle vertical, false sinon
 */
function isObstacleVertical() {
    var response = false;

    if (vitesse_mario_y >= 0) { // vers le bas à droite ou à gauche
        // si on est dans la map alors on détermine la réponse sinon on considère qu'il n'y a pas d'obstacle
        if (typeof tableau_map[mario_id_ligne] !== "undefined" && typeof tableau_map[mario_sg_ligne + 1] !== "undefined") {        
            response = (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide) 
                    || (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
                    || (   tableau_map[mario_sg_ligne + 1][offset_tableau + mario_sg_colonne] !== cellule_vide 
                        || tableau_map[mario_sg_ligne + 1][offset_tableau + mario_id_colonne] !== cellule_vide); // la distance entre la base de mario et l'obstacle est nulle
        }
    } else if (vitesse_mario_y < 0) { // vers le haut à droite ou à gauche
        // si on est dans la map alors on détermine la réponse sinon on considère qu'il n'y a pas d'obstacle
        if (typeof tableau_map[mario_sg_ligne] !== "undefined" && typeof tableau_map[mario_id_ligne - 1] !== "undefined") {
            response = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide) 
                    || (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
                    || (   tableau_map[mario_id_ligne - 1][offset_tableau + mario_sg_colonne] !== cellule_vide 
                       || tableau_map[mario_id_ligne - 1][offset_tableau + mario_id_colonne] !== cellule_vide); // la distance entre le sommet de mario et l'obstacle est nulle

            // on touché un obstacle, maintenant on teste si on a percuté un cube surprise
            if (response) {
                var isCubeSurprise = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] === "?");
                // si on a percuté un cube surprise, on ajoute une pièce d'or dans le tableau des personnages
                if (isCubeSurprise) {
                    // on change de caractère pour éviter de ramasser plusieurs fois une pièce
                    // Le "?" est remplacé par un "!"
                    tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] = "!";

                    var col = offset_tableau + mario_sg_colonne;
                    var lig = mario_sg_ligne - 1;
                    var zone_map_perso = Math.floor(col / LONGUEUR_MAP);
                    var num_perso = (typeof personnages[zone_map_perso] === "undefined" ? 0 : Object.keys(personnages[zone_map_perso]).length);
                    //console.log('zone_map_perso = ' + zone_map_perso + ' - num_perso = ' + num_perso);
                    if (num_perso === 0) {
                        personnages[zone_map_perso] = {};
                    }
                    var x = (col - zone_map_perso * LONGUEUR_MAP) * BLOC_WIDTH;
                    var y = lig * BLOC_HEIGHT;

                    ajouterPersonnage(zone_map_perso, num_perso, "p", x, y, lig, col, 0);
                }
            }
        }
    }

    return response;
}

/**
 * Affiche les coordonnées de mario à l'écran ou les infos du jeu
 */
function showInformation() {
    if (SHOW_COORDINATE) {
        RectanglePlein(0, (HAUTEUR_MAP + 1) * BLOC_HEIGHT, 20 * BLOC_WIDTH, 8 * BLOC_HEIGHT, 'yellow');
        Texte(0, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, "mario_sg_x = " + mario_sg_x, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, "mario_sg_colonne = " + mario_sg_colonne, "black");
        Texte(0, (HAUTEUR_MAP + 3) * BLOC_HEIGHT, "mario_sg_y = " + mario_sg_y, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 3) * BLOC_HEIGHT, "mario_sg_ligne = " + mario_sg_ligne, "black");
        Texte(0, (HAUTEUR_MAP + 4) * BLOC_HEIGHT, "mario_id_x = " + mario_id_x, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 4) * BLOC_HEIGHT, "mario_id_colonne = " + mario_id_colonne, "black");
        Texte(0, (HAUTEUR_MAP + 5) * BLOC_HEIGHT, "mario_id_y = " + mario_id_y, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 5) * BLOC_HEIGHT, "mario_id_ligne = " + mario_id_ligne, "black");
        Texte(0, (HAUTEUR_MAP + 6) * BLOC_HEIGHT, "vitesse_mario_x = " + vitesse_mario_x, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 6) * BLOC_HEIGHT, "vitesse_mario_y = " + vitesse_mario_y, "black");
        Texte(0, (HAUTEUR_MAP + 7) * BLOC_HEIGHT, "mario_is_obstacle_V = " + mario_is_obstacle_V, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 7) * BLOC_HEIGHT, "mario_is_obstacle_H = " + mario_is_obstacle_H, "black");
        Texte(0, (HAUTEUR_MAP + 8) * BLOC_HEIGHT, "isMarioSurLeSol = " + isMarioSurLeSol, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 8) * BLOC_HEIGHT, "isMarioSautParabolique = " + isMarioSautParabolique, "black");
        Texte(0, (HAUTEUR_MAP + 9) * BLOC_HEIGHT, "top_depart_chute_mario = " + top_depart_chute_mario, "black");
        Texte(10 * BLOC_WIDTH, (HAUTEUR_MAP + 9) * BLOC_HEIGHT, "initialiser_saut_mario = " + initialiser_saut_mario, "black");
    } else {
        //affiche le nombre de vies
        RectanglePlein(2 * BLOC_WIDTH + 1, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, 5 * BLOC_WIDTH, 2 * BLOC_HEIGHT, 'white');
        DrawImage(images["vie"], 0, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, 2 * BLOC_WIDTH, 2 * BLOC_HEIGHT);
        setCanvasFont('times', '30pt', 'bold');
        Texte(2 * BLOC_WIDTH + 1, (HAUTEUR_MAP + 4) * BLOC_HEIGHT, "X" + nbVieRestante, "black");
        //affiche le nombre de pieces ramassées        
        RectanglePlein(12 * BLOC_WIDTH + 1, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, 5 * BLOC_WIDTH, 2 * BLOC_HEIGHT, 'white');
        DrawImage(images["piece"], 10 * BLOC_WIDTH, (HAUTEUR_MAP + 2) * BLOC_HEIGHT, 2 * BLOC_WIDTH, 2 * BLOC_HEIGHT);
        Texte(12 * BLOC_WIDTH + 1, (HAUTEUR_MAP + 4) * BLOC_HEIGHT, "X" + nb_piece, "black");
    }
}

/**
 * Chargement d'un  niveau
 */
function loadGameLevel() {
    // remise à zéro du tableau des personnages au changement de niveau
    // sinon les personnages du niveau précédent apparaissent au niveau suivant
    personnages = {};

    initialiserJeu();

    var map = readFile(maps[num_map]);

    tableau_map = chargerTableau(map);
    
    afficherMap(tableau_map, zone_map);
}

/**
 * Vérifier si mario a perdu
 */
function isGameOver() {
    if(nbVieRestante < 1) {
        num_map = 0;
        game_over = true;
        nbVieRestante = NB_VIE_MARIO;
        instant_initial = Date.now();
        nb_piece = 0;
        playNewSound(musique_game_over);
    }
}

/**
 * Compter les pieces ramassées par mario
 */
function ramasser_piece() {
    nb_piece++;
    //playNewSound(musique_piece_or);
    if(nb_piece >= 100){
        nb_piece -= 100;
        nbVieRestante++;
    }
    
}

/**
 * Phase de lancement du jeu
 */
function runStartGame() {
    if (Date.now() - instant_initial < 200) {
        Effacer();
        DrawImage(images["deco"], 14 * BLOC_WIDTH, 0, 22 * BLOC_WIDTH, 22 * BLOC_HEIGHT);
    }
    if (Date.now() - instant_initial > 2000) {
        start_game = false;
        loadGameLevel();
    }    
}

/**
 * Phase de changement de niveau
 */
function runChangeLevel() {
    switch (etape_chgt_niveau) {
        case "initiale":
            Effacer();
            DrawImage(images["winner"], 17 * BLOC_WIDTH, 0, 14 * BLOC_WIDTH, 14 * BLOC_HEIGHT);
            playNewSound(musique_fin_niveau);
            etape_chgt_niveau = "suivante";
            instant_initial = Date.now();
            break;
        case "suivante":
            if (Date.now() - instant_initial > 1000 * musique_fin_niveau.duration / 2) {
                Effacer();
                DrawImage(images["level"],15 * BLOC_WIDTH , 2 * BLOC_HEIGHT, 20 * BLOC_WIDTH, 10 * BLOC_HEIGHT);
                etape_chgt_niveau = "finale";
                instant_initial = Date.now();
            }
            break;
        case "finale":
            if (Date.now() - instant_initial > 1000 * musique_fin_niveau.duration / 2) {
                // initialisation du jeu
                loadGameLevel();
                change_niveau = false;
                etape_chgt_niveau = "initiale";
            }
            break;
        default:

            break;
    }    
}

/**
 * Phase de Game Over
 */
function runGameOver() {
    if (Date.now() - instant_initial < 200) {
        Effacer();
        DrawImage(images["game_over"], 14 * BLOC_WIDTH, 0, 30 * BLOC_WIDTH, 22 * BLOC_HEIGHT);
    }
    if (Date.now() - instant_initial > musique_game_over.duration * 1000) {
        game_over = false;
        start_game = true;
        instant_initial = Date.now();           
    }
}

/**
 * Phase de jeu
 */
function runGame() {
    if (changeMap) {
        // Changement de zone de map
        afficherMap(tableau_map, zone_map);
        if (isMarioSurLeSol) { // affiche mario quand il change de map au sol
            afficherMario();
        }
        changeMap = false;
    } else {
        // Gestion des personnages de la zone de map affichée
        deplacerPersonnages();
        effacerPersonnages(zone_map);
    }

    afficherPersonnages();

    // gestion de mario
    if (isMarioSurLeSol) {
        deplacerMario();
    } else {
        faireSauterMario();
    }
}
//</editor-fold>

/**
 * Initialisation du jeu
 */
function setup() {
    console.log('----------------- NEW RUN ------------------------');
}

/**
 * Gestion du jeu
 * Il faut tout afficher ici sinon ça fonctionne mal
 */
function draw() {

    if (start_game) { // démarrage du jeu
        runStartGame();
    } else if (change_niveau) { // changement de niveau
        runChangeLevel();
    } else if(game_over) { // partie perdue
        runGameOver();
    } else { // ici on joue !
        runGame();
    }
}

// Lancement du jeu
Loop(-1);