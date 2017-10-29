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
 * Gravité
 * @type Number
 */
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
    '~' : 'http://www.annliz-bonin.com/wp-content/uploads/2017/05/carre%CC%81-blanc-300x300.png',
    '?' : 'https://t6.rbxcdn.com/5da98730977895279f05af2eb7bd7516',
    'b' : 'https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0396/3573/rbricks_large_shop_preview.png',
    '0' : 'https://t6.rbxcdn.com/5da98730977895279f05af2eb7bd7516',
    'B' : 'http://oi48.tinypic.com/30my7tx.jpg',
    't' : 'http://www.clker.com/cliparts/T/R/h/S/4/i/a-green-cartoon-pipe-hi.png',
    'c' : 'https://t7.rbxcdn.com/b885beb8ed89feb035643aff4785115f',
    '_' : 'https://t3.rbxcdn.com/1977bb7bbfc6b959cf6556daf6381793'
};
/**
 * Les differentes representations de mario
 * @type Array
 */
var mario = {
    'petit' : 'https://vignette.wikia.nocookie.net/mario/images/3/32/8_Bit_Mario.png/revision/latest?cb=20120602231304',
    'petit_gauche' : 'https://t3.rbxcdn.com/fcedf49f6eaf2176e2f788e568304f57',
    'petit_saute' : 'https://i.pinimg.com/originals/36/26/24/362624d9b105d5af3a0c3751659553e1.png',
    'petit_saute_gauche' : 'https://s-media-cache-ak0.pinimg.com/originals/58/cb/b4/58cbb4afc462d0002f802dc11c7f040a.jpg',
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
/**
 * Position de mario en x
 * @type Number
 */
var mario_x = 0;
/**
 * Position de mario en y
 * @type Number
 */
var mario_y = 0;
/**
 * Position precedente de mario en x
 * @type Number
 */
var mario_x_prec = 0;
/**
 * Position precedente de mario en y
 * @type Number
 */
var mario_y_prec = 0;
/**
 * Vitesse de mario horizontalement
 * @type Number
 */
var vitesse_mario_x = 0;
/**
 * Vitesse de mario verticalement
 * @type Number
 */
var vitesse_mario_y = 0;
/**
 * Ligne de mario dans la map
 * @type Number
 */
var mario_ligne = 0;
/**
 * Colonne de mario dans la map
 * @type Number
 */
var mario_colonne = 0;
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
 * Afficher mario
 * @param {float} temps Le temps du jeu
 * @param {array} tableau_map Tableau contenant la map
 * @returns {boolean} False si mario est en vol, True s'il a touche un obstacle
 */
function afficherMario(tableau_map) {
    // Math.ceil retourne la valeur d'un nombre arrondi à l'entier supérieur
    mario_ligne = mario_y / MARIO_HEIGHT_SMALL;
    mario_ligne = (vitesse_mario_y > 0 ? Math.ceil(mario_ligne) : Math.floor(mario_ligne));
    
    mario_colonne = mario_x / MARIO_WIDTH_SMALL;
    mario_colonne = (vitesse_mario_x > 0 ? Math.ceil(mario_colonne) : Math.floor(mario_colonne));
    //console.log(mario_x + " : " + mario_y);
    
    // effacer position precedente de mario
    DrawImage(bloc[cellule_vide],
              mario_x_prec + (vitesse_mario_x > 0 ? -1 : (vitesse_mario_x < 0 ? 1 : 0)), // decalage d'un pixel pour bien effacer l'image precedente
              mario_y_prec + (vitesse_mario_y > 0 ? -1 : (vitesse_mario_y < 0 ? 1 : 0)), 
              MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
    
    // afficher mario
    if (tableau_map[mario_ligne][mario_colonne] === cellule_vide) {
        DrawImage(mario['petit'],mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
        mario_x_prec = mario_x;
        mario_y_prec = mario_y;
        return false;
    } else {
        mario_x = (mario_colonne + (vitesse_mario_x > 0 ? -1 : (vitesse_mario_x < 0 ? 1 : 0))) * BLOC_WIDTH;
        mario_y = (mario_ligne + (vitesse_mario_y > 0 ? -1 : (vitesse_mario_y < 0 ? 1 : 0))) * BLOC_HEIGHT;
        
        DrawImage(mario['petit'],mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
        
        mario_x_prec = mario_x;
        mario_y_prec = mario_y;
        return true;
    }
}

/**
 * Animer la chute de mario dans le jeu
 * @param {float} temps Le temps du jeu
 * @param {array} tableau_map Tableau contenant la map
 * @returns {boolean} False si mario est en vol, True s'il a atteint le sol
 */
function faireTomberMario(temps, tableau_map) {
    mario_y = GRAVITY * Math.pow(temps, 2) / 2;
    vitesse_mario_y = GRAVITY * temps;
    
    return afficherMario(tableau_map);
}

/**
 * Deplacer mario dans le jeu
 * @returns {undefined}
 */
function deplacerMario () {
    window.onkeydown = function (e) {
        var key = e.keyCode || e.which;

        switch (key) {
           case KEY_RIGHT:
               DrawImage(bloc[cellule_vide], mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
               mario_x += 10;
               DrawImage(mario['petit'], mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
               break;

           case KEY_LEFT:
               DrawImage(bloc[cellule_vide], mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
               mario_x -= 10;
               DrawImage(mario['petit_gauche'], mario_x, mario_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
               break;

           default:

               break;
        }
    };
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
    if (isMarioTomber) {
        deplacerMario ();
    } else {
        isMarioTomber = faireTomberMario(tps, tableau_map);
    }
    
}

// Lancement du jeu
Loop(-1);