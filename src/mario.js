//<editor-fold defaultstate="collapsed" desc="Constantes">
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
 * Fichier contenant la map
 * @type String
 */
const MAP = 'map1.txt';
/**
 * Largeur d'un bloc a l'ecran
 * @type Number
 */
const BLOC_WIDTH = 20;
const BLOC_HEIGHT = 20;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const GRAVITY = 700;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Var globales">
/**
 * Je ne sais pas a quoi cela sert
 * @type Boolean
 */
turtleEnabled = false;
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
    '~' : '',
    '?' : 'https://t6.rbxcdn.com/5da98730977895279f05af2eb7bd7516',
    'b' : 'https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0396/3573/rbricks_large_shop_preview.png',
    '0' : 'https://t6.rbxcdn.com/5da98730977895279f05af2eb7bd7516',
    'B' : 'http://oi48.tinypic.com/30my7tx.jpg',
    't' : 'http://www.clker.com/cliparts/T/R/h/S/4/i/a-green-cartoon-pipe-hi.png',
    'c' : 'https://t7.rbxcdn.com/b885beb8ed89feb035643aff4785115f',
    '_' : 'http://oi48.tinypic.com/30my7tx.jpg'
};
/**
 * Les differentes representations de mario
 * @type Array
 */
var mario = {
    'petit' : 'https://vignette.wikia.nocookie.net/mario/images/3/32/8_Bit_Mario.png/revision/latest?cb=20120602231304',
    'petit_saute' : 'https://i.pinimg.com/originals/36/26/24/362624d9b105d5af3a0c3751659553e1.png',
    'grand' : 'http://img4.wikia.nocookie.net/__cb20130907061200/lawl-stadium/images/4/4d/8-Bit_Mario.png',
    'grand_saute' : 'http://www.thevideogamegallery.com/data/thumbs/790px/0021/tVGG_21561.jpg'
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
 * Mesure le temps dans le jeu
 * @type Number
 */
var tps = 0;
/**
 * indicateur de la chute de mario
 * @type Boolean
 */
var isMarioTomber = false;
/**
 * tableau 2D qui contient la map
 * @type Array
 */
var tableau_map;
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Fonctions">

/**
 * Lire la chaine de caractere map et la stocker dans un tableau
 * @param {string} map La chaine de caractere contenant la map
 * @returns {Array} Le tableau contenant la map
 */
function chargerTableau(map) {
    var T = [];
    // recuperation des lignes de la map
    var lignes = map.split("\n"); //split= separateur de chaines de caracteres dans un tableau
    
    var ligne = "";
    // parcours des lignes
    for (var lig = 0; lig < lignes.length; lig++) { //length=longueur
        ligne = lignes[lig];
        T[lig] = [];
        // ajout des donnees de la ligne dans le tableau
        for(var col = 0; col < ligne.length; col++) {
            T[lig][col] = ligne.substring(col,col+1);//substring= retourne une sous chaine de la chaine courante entre un indice de debut et un indice de fin
        }
    }
    //AfficherTableau(T);
    return T;
}

/**
 * Convertir le tableau en affichage graphique
 * @param {array} tableau Le tableau contenant la map
 * @param {int} zone La zone de la map a afficher
 * @returns {undefined}
 */
function afficherMap(tableau, zone) {
    var ligne, char, url, x, y;
    for (var lig = 0; lig < tableau.length; lig++) { //length=longueur
        ligne = tableau[lig];
        // on affiche les donnees d'une seule zone
        for(var col = zone * LONGUEUR_MAP; col < (zone + 1) * LONGUEUR_MAP && col < ligne.length; col++) {
            //console.log(tableau[lig][col]);
            char = tableau[lig][col];
            x = (col - zone * LONGUEUR_MAP) * BLOC_WIDTH;
            y = lig * BLOC_HEIGHT;
            url = (bloc[char] === undefined ? bloc['_'] : bloc[char]); //le triple egal signifie une egalite stricte
            DrawImage(url, x, y, BLOC_WIDTH, BLOC_HEIGHT);
        }
    }
}

/**
 * Animer la chute de mario dans le jeu
 * @param {float} temps Le temps du jeu
 * @param {array} tableau_map Tableau contenant la map
 * @returns {boolean} False si mario est en vol, True s'il a atteint le sol
 */
function faireTomberMario(temps, tableau_map) {
    var y = GRAVITY * temps * temps / 2;
    var ligne = Math.round(y / BLOC_HEIGHT); // Math.round retourne la valeur d'un nombre arrondi à l'entier le plus proche.

    if (tableau_map[ligne][0] === cellule_vide) {
        DrawImage(mario['petit'],0, y, BLOC_WIDTH, BLOC_HEIGHT);
        return false;
    }

    return true;
}
//</editor-fold>

/**
 * Initialisation du jeu
 * @returns {undefined}
 */
function setup() {
    console.log('----------------- NEW RUN ------------------------');

    var map = readFile(MAP);

    tableau_map = chargerTableau(map);
    
    afficherMap(tableau_map, zone_map);
}

/**
 * Gestion du jeu
 * @returns {undefined}
 */
function draw() {
    tps += 1 / FrameRate;
    //console.log(tps);
    if (!isMarioTomber) {
        isMarioTomber = faireTomberMario(tps, tableau_map);
    }
    
}

// Lancement du jeu
Loop(-1);