<map version="freeplane 1.6.0">
<!--To view this file, download free mind mapping software Freeplane from http://freeplane.sourceforge.net -->
<node TEXT="mario" FOLDED="false" ID="ID_185456413" CREATED="1477297964908" MODIFIED="1508796268671" STYLE="oval">
<font SIZE="18"/>
<hook NAME="MapStyle" zoom="0.826">
    <properties fit_to_viewport="false;" edgeColorConfiguration="#808080ff,#ff0000ff,#0000ffff,#00ff00ff,#ff00ffff,#00ffffff,#7c0000ff,#00007cff,#007c00ff,#7c007cff,#007c7cff,#7c7c00ff"/>

<map_styles>
<stylenode LOCALIZED_TEXT="styles.root_node" STYLE="oval" UNIFORM_SHAPE="true" VGAP_QUANTITY="24.0 pt">
<font SIZE="24"/>
<stylenode LOCALIZED_TEXT="styles.predefined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="default" COLOR="#000000" STYLE="fork">
<font NAME="SansSerif" SIZE="10" BOLD="false" ITALIC="false"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.details"/>
<stylenode LOCALIZED_TEXT="defaultstyle.attributes">
<font SIZE="9"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.note" COLOR="#000000" BACKGROUND_COLOR="#ffffff" TEXT_ALIGN="LEFT"/>
<stylenode LOCALIZED_TEXT="defaultstyle.floating">
<edge STYLE="hide_edge"/>
<cloud COLOR="#f0f0f0" SHAPE="ROUND_RECT"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.user-defined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="styles.topic" COLOR="#18898b" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subtopic" COLOR="#cc3300" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subsubtopic" COLOR="#669900">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.important">
<icon BUILTIN="yes"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.AutomaticLayout" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="AutomaticLayout.level.root" COLOR="#000000" STYLE="oval" SHAPE_HORIZONTAL_MARGIN="10.0 pt" SHAPE_VERTICAL_MARGIN="10.0 pt">
<font SIZE="18"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,1" COLOR="#0033ff">
<font SIZE="16"/>
<edge COLOR="#ff0000"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,2" COLOR="#00b439">
<font SIZE="14"/>
<edge COLOR="#0000ff"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,3" COLOR="#990000">
<font SIZE="12"/>
<edge COLOR="#00ff00"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,4" COLOR="#111111">
<font SIZE="10"/>
<edge COLOR="#ff00ff"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,5">
<edge COLOR="#00ffff"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,6">
<edge COLOR="#7c0000"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,7">
<edge COLOR="#00007c"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,8">
<edge COLOR="#007c00"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,9">
<edge COLOR="#7c007c"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,10">
<edge COLOR="#007c7c"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,11">
<edge COLOR="#7c7c00"/>
</stylenode>
</stylenode>
</stylenode>
</map_styles>
</hook>
<hook NAME="AutomaticEdgeColor" COUNTER="27" RULE="ON_BRANCH_CREATION"/>
<node TEXT="Lire la map" POSITION="right" ID="ID_1928379183" CREATED="1508796275185" MODIFIED="1508796301406">
<icon BUILTIN="button_ok"/>
<edge COLOR="#007c00"/>
</node>
<node TEXT="Charger la map dans un tableau" POSITION="right" ID="ID_898751898" CREATED="1508796303241" MODIFIED="1508796331093">
<icon BUILTIN="button_ok"/>
<edge COLOR="#7c007c"/>
</node>
<node TEXT="Afficher la map zone par zone" POSITION="right" ID="ID_474413802" CREATED="1508796316896" MODIFIED="1508799713327">
<icon BUILTIN="button_ok"/>
<edge COLOR="#007c7c"/>
</node>
<node TEXT="Faire tomber mario dans la map" POSITION="right" ID="ID_1776137652" CREATED="1508796333824" MODIFIED="1508796347209">
<edge COLOR="#7c7c00"/>
</node>
<node TEXT="faire bouger mario" POSITION="right" ID="ID_1328643436" CREATED="1508796357136" MODIFIED="1508799896128">
<edge COLOR="#0000ff"/>
<node TEXT="Faire sauter mario" ID="ID_1924242408" CREATED="1508796348280" MODIFIED="1508799911080">
<node TEXT="D&#xe9;placement en sautant" ID="ID_1241700910" CREATED="1508799927046" MODIFIED="1508799935032"/>
</node>
<node TEXT="int&#xe9;ragir avec les obstacles" ID="ID_769524741" CREATED="1508797187430" MODIFIED="1508888065911">
<node TEXT="1" OBJECT="java.lang.Long|1" ID="ID_857537216" CREATED="1508883313400" MODIFIED="1508883315337">
<node TEXT="calculer position des 4 coins du cube contenant mario" ID="ID_429782938" CREATED="1508883275336" MODIFIED="1508883679044"/>
<node TEXT="convertir ces 4 positions en ligne et colonne" ID="ID_1467550452" CREATED="1508883319118" MODIFIED="1508883683452"/>
<node TEXT="V&#xe9;rifier ce qu&apos;il y a dans le tableau de la map &#xe0; ces 4 positions" ID="ID_1465024316" CREATED="1508883337238" MODIFIED="1508883696356"/>
</node>
<node TEXT="2" OBJECT="java.lang.Long|2" ID="ID_1930459297" CREATED="1508883365726" MODIFIED="1508883367303">
<node TEXT="Calculer la distance entre le centre du cube de mario et le centre du cube des obstacles d&#xe9;tect&#xe9;s" ID="ID_1453846668" CREATED="1508883445333" MODIFIED="1508887793272"/>
<node TEXT="mario va int&#xe9;ragir avec celui qui a la distance minimale" ID="ID_473438708" CREATED="1508883541396" MODIFIED="1508883562765"/>
</node>
<node TEXT="3" OBJECT="java.lang.Long|3" ID="ID_1137297764" CREATED="1508884017694" MODIFIED="1508884019416">
<node TEXT="D&#xe9;terminer dans quel cadran se trouve mario" ID="ID_255446389" CREATED="1508884020662" MODIFIED="1508884042311">
<node TEXT="calculer les coordonn&#xe9;es (x,y) du centre du cube de mario dans le rep&#xe8;re ayant pour origine le centre du cube obstacle" ID="ID_1940599840" CREATED="1508885850584" MODIFIED="1508886951558"/>
<node TEXT="x&gt;0 &amp;&amp; y&gt;0 =&gt; cadran Nord est" ID="ID_1273380044" CREATED="1508886834780" MODIFIED="1508886883910"/>
<node TEXT="x&gt;0 &amp;&amp; y&lt;0 =&gt; cadran Sud est" ID="ID_1320440590" CREATED="1508886834780" MODIFIED="1508886909566"/>
<node TEXT="x&lt;0 &amp;&amp; y&lt;0 =&gt; cadran Sud ouest" ID="ID_46109289" CREATED="1508886834780" MODIFIED="1508886932805"/>
<node TEXT="x&lt;0 &amp;&amp; y&gt;0 =&gt; cadran nord ouest" ID="ID_1010830299" CREATED="1508886834780" MODIFIED="1508886971565"/>
</node>
<node TEXT="le cadran indique avec quelles ar&#xea;tes mario int&#xe9;ragit" ID="ID_182063912" CREATED="1508884044558" MODIFIED="1508887259178">
<node TEXT="le calcul de l&apos;intersection entre la droite qui relie le centre du cube de mario et le centre du cube obstacle interceptant les 2 ar&#xea;tes du cadran donne 2 points" ID="ID_1023483950" CREATED="1508887267543" MODIFIED="1508887662814">
<node TEXT="on retient le point d&apos;intersection qui est sur l&apos;ar&#xea;te pour d&#xe9;terminer avec quel c&#xf4;t&#xe9; int&#xe9;ragit mario" ID="ID_1909743633" CREATED="1508887324886" MODIFIED="1508887746820"/>
</node>
</node>
</node>
<node TEXT="4" OBJECT="java.lang.Long|4" ID="ID_225023904" CREATED="1508884068789" MODIFIED="1508884070919">
<node TEXT="interpoler la position pr&#xe9;c&#xe9;dente de mario, sa position actuelle et l&apos;ar&#xea;te retenue pour d&#xe9;terminer la position r&#xe9;elle de mario" ID="ID_100663154" CREATED="1508884072165" MODIFIED="1508887899863">
<node TEXT="Quelle m&#xe9;thode" ID="ID_781498889" CREATED="1508887901336" MODIFIED="1508887916956">
<icon BUILTIN="help"/>
</node>
</node>
<node TEXT="repositionner mario" ID="ID_1499811705" CREATED="1508887936903" MODIFIED="1508887944857"/>
</node>
<node TEXT="5" OBJECT="java.lang.Long|5" ID="ID_1247867238" CREATED="1508888009782" MODIFIED="1508888011512">
<node TEXT="d&#xe9;terminer la direction du mouvement de mario" ID="ID_487693112" CREATED="1508887990198" MODIFIED="1508888021048"/>
</node>
<node TEXT="6" OBJECT="java.lang.Long|6" ID="ID_252645339" CREATED="1508887949439" MODIFIED="1508888033193">
<node TEXT="recommencer &#xe0; l&apos;&#xe9;tape 1 jusqu&apos;&#xe0; ce que marion n&apos;intercepte plus aucun obstacle" ID="ID_630978599" CREATED="1508887956432" MODIFIED="1508887983281"/>
</node>
</node>
<node TEXT="Changer de map" ID="ID_934989759" CREATED="1508799873334" MODIFIED="1508799880488"/>
</node>
<node TEXT="animer le d&#xe9;placement des personnages" POSITION="right" ID="ID_1452434819" CREATED="1508797134287" MODIFIED="1508797166168">
<edge COLOR="#00ffff"/>
</node>
<node TEXT="Bonus" POSITION="left" ID="ID_608593155" CREATED="1508797101009" MODIFIED="1508797104009">
<edge COLOR="#ff00ff"/>
<node TEXT="Ajouter un compteur" ID="ID_1268999964" CREATED="1508797083040" MODIFIED="1508797101026">
<node TEXT="de temps" ID="ID_1336987994" CREATED="1508797106287" MODIFIED="1508797109032"/>
<node TEXT="de points" ID="ID_309494826" CREATED="1508797109487" MODIFIED="1508797116145"/>
</node>
</node>
</node>
</map>
