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
 * Gravité
 * @type Number
 */
const GRAVITY = 700;
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
        // on affiche les donnees d'une seule zone
        for(var col = zone * LONGUEUR_MAP; col < (zone + 1) * LONGUEUR_MAP && col < ligne.length; col++) {
            //console.log(tableau[lig][col]);
            char = tableau[lig][col];
            x = (col - zone * LONGUEUR_MAP) * BLOC_WIDTH;            
            url = (bloc[char] === undefined ? bloc['_'] : bloc[char]); //le triple egal signifie une egalite stricte
            DrawImage(url, x, y, BLOC_WIDTH, BLOC_HEIGHT);
        }
        if (SHOW_COORDINATE) {
            Texte(x + BLOC_WIDTH, y + 2 * BLOC_HEIGHT / 3, lig, "#000000");
        }
    }
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
 * Animer la chute de mario dans le jeu
 * @param {float} temps Le temps du jeu
 * @returns {boolean} False si mario est en vol, True s'il a atteint le sol
 */
function faireTomberMario(temps) {
    mario_sg_y = GRAVITY * Math.pow(temps, 2) / 2;
    mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
    vitesse_mario_y = GRAVITY * temps;
    
    setMarioLigneColonne();
    
    return afficherMario();
}

/**
 * Afficher mario et détecter les obstacles
 * @returns {boolean} False si mario est en vol, True s'il a touche un obstacle
 */
function afficherMario() {
    // effacer position precedente de mario
    DrawImage(bloc[cellule_vide], mario_sg_x_prec, mario_sg_y_prec, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
    
    // afficher mario
    var isNoObstacleH = isAucunObstacleHorizontal();
    var isNoObstacleV = isAucunObstacleVertival();
    var url_mario = (sens === DROITE ? mario['petit'] : mario['petit_gauche']);
    
    if (isNoObstacleH && isNoObstacleV) {
        DrawImage(url_mario, mario_sg_x, mario_sg_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);
        
        vitesse_mario_x = 0;
        vitesse_mario_y = 0;
    } else {
        if (!isNoObstacleH) {
            mario_sg_x = (vitesse_mario_x > 0 ? mario_sg_colonne : mario_id_colonne) * BLOC_WIDTH;
            console.log("!isNoObstacleH");
        }

        if (!isNoObstacleV) {
            mario_sg_y = (vitesse_mario_y > 0 ? mario_sg_ligne : mario_id_ligne) * BLOC_HEIGHT;
            console.log("!isNoObstacleV");
        }
        
        DrawImage(url_mario, mario_sg_x, mario_sg_y, MARIO_WIDTH_SMALL, MARIO_HEIGHT_SMALL);

        vitesse_mario_x = 0;
        vitesse_mario_y = 0;
        
        setMarioLigneColonne();
    }
    
    mario_sg_x_prec = mario_sg_x;
    mario_sg_y_prec = mario_sg_y;
        
    showInformation();
    
    return !(isNoObstacleH && isNoObstacleV);
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
 * @returns {Boolean} True alors pas d'obstacle, false sinon
 */
function isAucunObstacleHorizontal() {
    var response = true;
    
    if (vitesse_mario_x > 0) {
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] === cellule_vide) 
                && (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] === cellule_vide);
    } else if (vitesse_mario_x < 0) {
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] === cellule_vide) 
                && (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] === cellule_vide);
    }

    return response;
}

/**
 * Détection d'obstacle vertical
 * @returns {Boolean} True alors pas d'obstacle, false sinon
 */
function isAucunObstacleVertival() {
    var response = true;

    if (vitesse_mario_y > 0) {
       response = (tableau_map[mario_id_ligne][offset_tableau + mario_sg_colonne] === cellule_vide) 
               && (tableau_map[mario_id_ligne][offset_tableau + mario_id_colonne] === cellule_vide);
    } else if (vitesse_mario_y < 0) {
        response = (tableau_map[mario_sg_ligne][offset_tableau + mario_sg_colonne] === cellule_vide) 
                && (tableau_map[mario_sg_ligne][offset_tableau + mario_id_colonne] === cellule_vide);
    }

    return response;
}

/**
 * Affiche les coordonnées de mario à l'écran
 * @returns {undefined}
 */
function showInformation() {
    if (SHOW_COORDINATE) {
        RectanglePlein(0, (HAUTEUR_MAP + 1) * BLOC_HEIGHT, 20 * BLOC_WIDTH, 5 * BLOC_HEIGHT, 'yellow');
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
    }
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
               mario_sg_y -= PAS_X;
               vitesse_mario_y = -PAS_X * FrameRate;
               break;

           case KEY_DOWN:
               mario_sg_y += PAS_X;
               vitesse_mario_y = PAS_X * FrameRate;
               break;
               
           default:
               vitesse_mario_x = 0;
               vitesse_mario_y = 0;
               break;
        }
        mario_id_x = mario_sg_x + MARIO_WIDTH_SMALL;
        mario_id_y = mario_sg_y + MARIO_HEIGHT_SMALL;
        
        setMarioLigneColonne();

        afficherMario();
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
        deplacerMario();
    } else {
        isMarioTomber = faireTomberMario(tps);
    }
}

// Lancement du jeu
Loop(-1);