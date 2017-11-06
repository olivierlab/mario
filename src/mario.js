//"use strict";

//<editor-fold defaultstate="collapsed" desc="Constantes">
/**
 * Afficher les coordonnées du tableau
 * @type Boolean
 */
const SHOW_COORDINATE = true;
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
const GAUCHE = 0;
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
 * Top depart du jeu en ms
 * @type Number
 */
var top_depart_jeux = Date.now();
/**
 * Indique si mario a touché le sol
 * @type Boolean
 */
var isMarioSautParabolique = false;
/**
 * indique si mario est en train de sauter
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
 * Timestamp qui marque le top depart de la chute de mario ou false si non initialisé
 * @type int
 */
var top_depart_chute_mario = false;
/**
 * indicateur qui marque le lancement du saut ou de la chute de mario
 * @type boolean
 */
var initialiser_saut_mario = true;
/**
 * Indicateur de touche appuyée
 * @type Boolean
 */
var key_pressed = NO_KEY;
/**
 * Position de départ en y de mario au moment du saut
 * @type Number
 */
var mario_sg_y_top;
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
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Objets">

//<editor-fold defaultstate="collapsed" desc="Exemple de déclaration de classes et héritage">
//class Polygone {
//  constructor(hauteur, largeur) {
//    this.hauteur = hauteur;
//    this.largeur = largeur;
//  }
//}
//
//class Carré extends Polygone {
//  constructor(longueurCôté) {
//    super(longueurCôté, longueurCôté);
//  }
//  get aire() {
//    return this.hauteur * this.largeur;
//  }
//  set longueurCôté(nouvelleLongueur) {
//    this.hauteur = nouvelleLongueur;
//    this.largeur = nouvelleLongueur;
//  }
//}
//
//var carré = new Carré(2);
//</editor-fold>

/**
 * Objet définissant le personnage de mario
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/H%C3%A9ritage_et_cha%C3%AEne_de_prototypes
 * @type type
 */
class class_mario {
    constructor() {
        /**
         * Indique si mario a touché le sol
         * @type Boolean
         */
        this.isOnGround = false;
        /**
         * indique si mario est en train de sauter
         * @type Boolean
         */
        this.isASauter = false;
        /**
         * Position du coin supérieur gauche de mario en x
         * @type Number
         */
        this.sg_x = 0;
        /**
         * Position du coin supérieur gauche de mario en y
         * @type Number
         */
        this.sg_y = 0;
        /**
         * Position du coin inférieur droit de mario en x
         * @type Number
         */
        this.id_x = this.sg_x + MARIO_WIDTH_SMALL;
        /**
         * Position du coin inférieur droit de mario en y
         * @type Number
         */
        this.id_y = this.sg_y + MARIO_HEIGHT_SMALL;
        /**
         * Position precedente du coin supérieur gauche de mario en x
         * @type Number
         */
        this.sg_x_prec = this.sg_x;
        /**
         * Position precedente du coin supérieur gauche de mario en y
         * @type Number
         */
        this.sg_y_prec = this.sg_y;
        /**
         * Position precedente du coin inférieur droit de mario en x
         * @type Number
         */
        this.id_x_prec = this.id_x;
        /**
         * Position precedente du coin inférieur droit de mario en y
         * @type Number
         */
        this.id_y_prec = this.id_y;
        /**
         * Vitesse de mario horizontalement (déplacement vers la droite si >0, déplacement vers la gauche si <0)
         * @type Number
         */
        this.vitesse_x = 0;
        /**
         * Vitesse de mario verticalement (déplacement vers le bas si >0, déplacement vers le haut si <0)
         * @type Number
         */
        this.vitesse_y = 0;
        /**
         * Ligne du coin supérieur gauche de mario dans la map
         * @type Number
         */
        this.sg_ligne = 0;
        /**
         * Colonne du coin supérieur gauche de mario dans la map
         * @type Number
         */
        this.sg_colonne = 0;
        /**
         * Ligne du coin inférieur droit de mario dans la map
         * @type Number
         */
        this.id_ligne = this.sg_ligne + 1;
        /**
         * Colonne du coin inférieur droit de mario dans la map
         * @type Number
         */
        this.id_colonne = this.sg_colonne + 1;
    }
}
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
    // calcul du nombre de maps contenues dans le tableau
    nb_maps = Math.floor(ligne.length / LONGUEUR_MAP);
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
    Initialiser();
    var ligne, char, url, x, y;
    for (var lig = 0; lig < tableau.length; lig++) { //length=longueur
        ligne = tableau[lig];
        y = lig * BLOC_HEIGHT;
        // on affiche les donnees d'une zone
        for(var col = zone * LONGUEUR_MAP; col < (zone + 1) * LONGUEUR_MAP && col < ligne.length; col++) {
            //console.log(tableau[lig][col]);
            char = tableau[lig][col];
            x = (col - zone * LONGUEUR_MAP) * BLOC_WIDTH;            
            url = (bloc[char] === undefined ? bloc['_'] : bloc[char]); //le triple egal signifie une egalite stricte
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
function faireTomberMario() {
    if (initialiser_saut_mario) {
        initialiser_saut_mario = false;
        top_depart_chute_mario = Date.now();
        mario_sg_y_top = mario_sg_y;
    }
    var temps = (Date.now() - top_depart_chute_mario) / 1000;
    
    if (isMarioSautParabolique) {
        mario_sg_y = Math.floor(GRAVITY * Math.pow(temps, 2) / 2 - V0 * temps) + mario_sg_y_top;
        vitesse_mario_y = GRAVITY * temps - V0;
    } else {
        mario_sg_y = Math.floor(GRAVITY * Math.pow(temps, 2) / 2) + mario_sg_y_top;
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
    // est déclanché UNIQUEMENT quand on lache une touche !
    window.onkeyup = function (e) {
        key_pressed = NO_KEY; // détection du relachement de touche
    };

    // est déclanché UNIQUEMENT quand on appuie une touche !
    window.onkeydown = function (e) {        
        key_pressed = e.keyCode || e.which; // détection de la touche appuyée
    };
    
    // quand il ne se passe rien, on ne fait rien !
    if (!isMarioSurLeSol || key_pressed !== NO_KEY) {
        keyDeplacer(key_pressed);

        if (isMarioTomberDansUnTrou()) {
            // initialisation des variables aux conditions de départ du jeu
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

            afficherMap(tableau_map, zone_map);
        } else {
            setMarioLigneColonne();

            afficherMario();
        }
    }
}

/**
 * Détecter si mario est tombé dans un trou
 * @returns {boolean} True s'il est tombé dans un trou, false sinon
 */
function isMarioTomberDansUnTrou() {
    return mario_sg_y > (HAUTEUR_MAP - 1) * BLOC_HEIGHT;
}

/**
 * Déplace mario en fonction de la touche appuyée
 * @param {type} key Touche appuyée
 * @returns {undefined}
 */
function keyDeplacer(key) {
    switch (key) {
       case KEY_RIGHT:
           sens = DROITE;
           mario_sg_x += PAS_X;
           vitesse_mario_x = PAS_X * FrameRate;
           break;

       case KEY_LEFT:
           sens = GAUCHE;
           mario_sg_x -= PAS_X;
           vitesse_mario_x = -PAS_X * FrameRate;
           break;

       case KEY_UP:
           // cette touche doit être désactivée uniquement quand mario est sur le sol sinon il saute sans cesse
           if(isMarioSurLeSol) {
                isMarioSurLeSol = false;
                initialiser_saut_mario = true;
                mario_sg_y -= 1;
           }
           break;

       case KEY_DOWN:
           //mario_sg_y += PAS_X;
           //vitesse_mario_y = PAS_X * FrameRate;
           //isMarioSurLeSol = false;
           break;

       default:
           break;
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
    var url_mario = (sens === DROITE ? mario['petit'] : mario['petit_gauche']);
    
    if (!isObstacleH && !isObstacleV) {
        DrawImage(url_mario, mario_sg_x, mario_sg_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);

        //vitesse_mario_x = 0;
        //vitesse_mario_y = 0;
    } else {
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
        
        DrawImage(url_mario, mario_sg_x, mario_sg_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
        
        setMarioLigneColonne();

        // on reverifie si mario est dans le vide
        isObstacleV = isObstacleVertical();        
    }
    
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
    if (mario_sg_ligne < 0) { // sortie de map en haut
        mario_sg_ligne = 0;
        mario_id_ligne = mario_sg_ligne;
        mario_sg_y = 0;
        mario_id_y = MARIO_HEIGHT_SMALL;
    } else if (mario_id_ligne >= HAUTEUR_MAP) { // sortie de map en bas
        mario_id_ligne = HAUTEUR_MAP - 1;
        mario_sg_ligne = mario_id_ligne;
        mario_id_y = HAUTEUR_MAP * MARIO_HEIGHT_SMALL;
        mario_sg_y = mario_id_y - MARIO_HEIGHT_SMALL;
    }

    if (mario_sg_colonne < 0) { // sortie de map à gauche
        if (zone_map > 0) { // changement de map
            zone_map--;
            offset_tableau = zone_map * LONGUEUR_MAP;
            afficherMap(tableau_map, zone_map);
            // positionnement en fin de map
            mario_id_colonne = LONGUEUR_MAP - 1;
            mario_id_x = (mario_id_colonne + 1) * MARIO_WIDTH_SMALL;
            mario_sg_colonne = mario_id_colonne;
            mario_sg_x = mario_id_x - MARIO_WIDTH_SMALL;
        } else {
            mario_sg_colonne = 0;
            mario_id_colonne = 0;
            mario_sg_x = 0;
            mario_id_x = MARIO_WIDTH_SMALL;
        }
    } else if (mario_id_colonne >= LONGUEUR_MAP) { // sortie de map à droite
        if (zone_map + 1 < nb_maps) { // changement de map
            zone_map++;
            offset_tableau = zone_map * LONGUEUR_MAP;
            afficherMap(tableau_map, zone_map);
            // positionnement en début de map
            mario_sg_colonne = 0;
            mario_id_colonne = 0;
            mario_sg_x = 0;
            mario_id_x = MARIO_WIDTH_SMALL;
        } else {
            mario_id_colonne = LONGUEUR_MAP - 1;
            mario_id_x = (mario_id_colonne + 1) * MARIO_WIDTH_SMALL;
            mario_sg_colonne = mario_id_colonne;
            mario_sg_x = mario_id_x - MARIO_WIDTH_SMALL;
        }
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
 * Détection d'obstacle vertical
 * @returns {Boolean} True alors obstacle vertical, false sinon
 */
function isObstacleVertical() {
    var response = false;

    if (vitesse_mario_y >= 0) { // vers le bas à droite ou à gauche
       response = (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide) 
               || (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
               || (   tableau_map[mario_sg_ligne + 1][offset_tableau + mario_sg_colonne] !== cellule_vide 
                   || tableau_map[mario_sg_ligne + 1][offset_tableau + mario_id_colonne] !== cellule_vide); // la distance entre la base de mario et l'obstacle est nulle
    } else if (vitesse_mario_y < 0) { // vers le haut à droite ou à gauche
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] !== cellule_vide) 
                || (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] !== cellule_vide)
                || (   tableau_map[mario_id_ligne - 1][offset_tableau + mario_sg_colonne] !== cellule_vide 
                   || tableau_map[mario_id_ligne - 1][offset_tableau + mario_id_colonne] !== cellule_vide); // la distance entre le sommet de mario et l'obstacle est nulle
    }

    return response;
}

/**
 * Affiche les coordonnées de mario à l'écran
 * @returns {undefined}
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
    }
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
    if (isMarioSurLeSol) {
        deplacerMario();
    } else {
        faireTomberMario();
    }
}

// Lancement du jeu
Loop(-1);