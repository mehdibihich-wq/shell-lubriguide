import { useState } from "react";

// ══════════════════════════════════════════════════════════
// CATALOGUE MARQUES / MODÈLES
// ══════════════════════════════════════════════════════════
const VEHICLES = {
  "Renault":        ["Clio IV/V","Clio E-Tech","Mégane IV/V","Mégane E-Tech","Captur I/II","Kadjar","Austral","Arkana","Espace V/VI","Koleos","Twingo III","Zoe","Laguna III","Talisman","Fluence","Kangoo II/III","Trafic III","Master IV","Express"],
  "Peugeot":        ["106","107","108","206","207","208 I/II","208 E","306","307","308 I/II/III","408","508 I/II","2008 I/II","3008 I/II","5008 I/II","Rifter","Partner III","Expert III","Boxer"],
  "Citroën":        ["C1","C2","C3 I/II/III","C3 Aircross","C3 Picasso","C4 I/II/III","C4 Cactus","C4 Picasso","C5 I/II","C5 Aircross","C5 X","C6","Berlingo III","SpaceTourer","Jumpy III","Jumper"],
  "DS Automobiles": ["DS 3 Crossback","DS 4","DS 5","DS 7 Crossback","DS 9"],
  "Dacia":          ["Logan I/II/III","Sandero I/II/III","Sandero Stepway","Duster I/II","Lodgy","Dokker","Spring","Jogger"],
  "Volkswagen":     ["Polo V/VI","Golf V/VI/VII/VIII","Golf GTI","Golf R","Golf Variant","Passat B6/B7/B8","Arteon","Tiguan I/II","T-Roc","T-Cross","Touareg II/III","Touran","ID.3","ID.4","ID.5","ID.7","Caddy IV/V","Transporter T5/T6","Crafter II","Amarok"],
  "Audi":           ["A1 8X/GB","A3 8P/8V/8Y","A3 Sportback","A4 B7/B8/B9","A4 Avant","A4 Allroad","A5 8T/F5","A6 C6/C7/C8","A7","A8 D3/D4/D5","Q2","Q3 8U/F3","Q4 e-tron","Q5 8R/FY","Q7 4L/4M","Q8","TT 8J/8S","R8","e-tron GT","RS3","RS4","RS5","RS6","S3","S4","S5","S6"],
  "BMW":            ["Série 1 E81/E87/F20/F40","Série 2 F22/F45/G42","Série 3 E90/F30/G20","Série 3 Touring","Série 4 F32/G22","Série 5 E60/F10/G30","Série 5 Touring","Série 7 E65/F01/G11","X1 E84/F48/U11","X2 F39","X3 E83/F25/G01","X4 F26/G02","X5 E70/F15/G05","X6 E71/F16/G06","X7","Z4 E89/G29","M2","M3","M4","M5","i3","i4","i5","i7","iX","iX1","iX3"],
  "Mercedes-Benz":  ["Classe A W168/W169/W176/W177","Classe B W245/W246/W247","Classe C W203/W204/W205/W206","Classe E W210/W211/W212/W213","Classe G W463","Classe S W220/W221/W222/W223","CLA C117/C118","CLS C218/C257","EQA","EQB","EQC","EQE","EQS","GLA H247","GLB","GLC X253/X254","GLE W166/V167","GLS X167","AMG GT","SL R230/R231","Vito W639/W447","Sprinter W906/W907","Citan"],
  "Opel / Vauxhall":["Astra H/J/K/L","Corsa D/E/F","Insignia A/B","Crossland X","Grandland X","Mokka A/B","Mokka-e","Vivaro B/C","Movano B","Zafira B/C"],
  "Porsche":        ["911 996/997/991/992","911 GT3","Boxster 986/987/981/718","Cayman 987/981/718","Cayenne 9PA/92A/9YA","Macan 95B","Panamera 970/971","Taycan"],
  "Land Rover":     ["Defender L319/L663","Discovery 3/4/5","Discovery Sport L550","Freelander 2","Range Rover L322/L405","Range Rover Sport L320/L494","Range Rover Evoque L538/L551","Range Rover Velar L560"],
  "Jaguar":         ["E-Pace X540","F-Pace X761","F-Type X152","I-Pace","XE X760","XF X250/X260","XJ X350/X351"],
  "MINI":           ["Mini One/Cooper R50/R56/F55/F56","Mini Cooper S","Mini Cooper SE","Mini Cabrio R52/R57/F57","Mini Clubman R55/F54","Mini Countryman R60/F60"],
  "Bentley":        ["Continental GT III","Bentayga","Flying Spur III","Mulsanne"],
  "Rolls-Royce":    ["Ghost RR4/N29B","Phantom VIII","Cullinan","Spectre"],
  "Aston Martin":   ["DB11","DB12","Vantage V8/V12","DBS Superleggera","DBX"],
  "Fiat":           ["500 312","500e","500X 334","500L 330","Punto 188/199","Grande Punto","Doblo II","Panda II/III","Tipo 356","Bravo 198","Ducato III","Talento","Scudo II"],
  "Alfa Romeo":     ["147","156","159","Giulietta 940","Giulia 952","Stelvio 949","Tonale","4C","MiTo 955"],
  "Lancia":         ["Delta III","Ypsilon 843/846","Musa","Thesis"],
  "Ferrari":        ["Roma","Portofino M","SF90 Stradale","F8 Tributo/Spider","812 Superfast/GTS","296 GTB","California T","488 GTB/Spider","458 Italia","F430","360 Modena"],
  "Lamborghini":    ["Huracán LP610/EVO","Aventador LP700/S","Urus","Revuelto"],
  "Maserati":       ["Ghibli M157","Quattroporte VI","Levante M161","GranTurismo II","GranCabrio II","MC20","Grecale"],
  "SEAT":           ["Ibiza IV/V","Leon II/III/IV","Arona","Ateca","Tarraco","Alhambra II","Toledo IV"],
  "Cupra":          ["Formentor","Leon","Ateca","Born","Terramar"],
  "Škoda":          ["Fabia II/III/IV","Octavia II/III/IV","Superb II/III","Karoq","Kodiaq","Scala","Kamiq","Enyaq","Rapid"],
  "Volvo":          ["C40 Recharge","S40 II","S60 II/III","S80 II","S90 II","V40 II","V50","V60 I/II","V60 Cross Country","V90 II","V90 Cross Country","XC40","XC40 Recharge","XC60 I/II","XC70 II","XC90 I/II","EX30","EX90"],
  "Saab":           ["9-3 II","9-5 II","900"],
  "Polestar":       ["Polestar 1","Polestar 2","Polestar 3","Polestar 4"],
  "Toyota":         ["Aygo X/B40","Yaris XP90/XP130/XP210","Yaris Cross","Yaris GR","Corolla E140/E150/E170/E210","Corolla Cross","Camry XV70","Avensis T25/T27","Auris E150/E180","Prius XW20/XW30/XW50/XW60","Prius PHV","C-HR NGX50","RAV4 XA40/XA50","RAV4 PHEV","Land Cruiser J200/J300","Hilux VIII","Proace II","Proace City","GR86","GR Supra DB","bZ4X"],
  "Honda":          ["Jazz GD/GE/GK/GR","Jazz e:HEV","Civic FD/FK/FC/FL","Civic Type R FK2/FK8","Accord CR","CR-V RD/RE/RM/RW","HR-V RU/RV","e ZD1","Insight ZE4","CR-Z ZF1","S2000 AP1/AP2","NSX NC1"],
  "Nissan":         ["Micra K12/K13/K14","Note E11/E12","Juke F15/F16","Leaf ZE0/ZE1","Qashqai J10/J11/J12","X-Trail T31/T32/T33","Murano Z51","Navara D40/D23","GT-R R35","370Z Z34","Ariya FE0"],
  "Mazda":          ["Mazda2 DJ","Mazda3 BL/BM/BP","Mazda6 GH/GJ/GL","CX-3 DK","CX-30 DM","CX-5 KE/KF","CX-60 KH","MX-5 NC/ND","MX-30 DR","RX-8 SE3P"],
  "Subaru":         ["Impreza GD/GH/GP/GT","WRX VA","WRX STI GVB/VAB","Legacy BM/BR/BS","Outback BM/BR/BS/BT","Forester SJ/SK","XV GP/GT","BRZ ZC6/ZD8","Solterra"],
  "Mitsubishi":     ["Colt Z30","Lancer CX/CY","Lancer Evolution X","Galant EA","Eclipse Cross GK","Outlander CW/GF/GN","Outlander PHEV GG/GN","ASX GA","L200 KA/KB/KK","Pajero V80/V90"],
  "Suzuki":         ["Alto HA25","Swift ZC/ZD/ZE/NZ","Swift Sport ZC33","Ignis MF","Celerio WQR","Baleno EW","SX4 S-Cross JY","Vitara LY","Jimny JB64/JB74","Across AXUH54"],
  "Lexus":          ["CT 200h ZWA10","UX ZA10","IS XE20/XE30","ES XV70","GS GRL10","LS F40/F50","NX AZ10/AZ20","RX AL10/AL20/AL30","GX URJ150","LX URJ200","LC URZ100","RC FSB10","RZ 450e"],
  "Infiniti":       ["Q30 H15","Q50 V37","Q60 CV37","QX30 H15","QX50 J55","QX60 L50","QX70 S51","QX80 Z62"],
  "Hyundai":        ["i10 PA/IA/AC3","i20 PB/GB/BC3","i20 N","i30 FD/GD/PD/CN7","i30 N","i40 VF","Tucson LM/TL/NX4","Santa Fe CM/DM/TM/MX5","Kona OS","Kona Electric OS EV","Ioniq AE","Ioniq 5 NE","Ioniq 6 CE","Nexo FE","Veloster FS","Bayon BC3"],
  "Kia":            ["Picanto JA/SA","Rio UB/YB","Stonic YB","Ceed ED/JD/CD","Ceed SW","ProCeed CD","XCeed CD","Soul AM/SK3","Niro DE","Niro EV DE","Sportage SL/QL/NQ5","Sorento XM/UM/MQ4","EV6 CV","EV9 MV","Stinger CK","Carnival KA4"],
  "Genesis":        ["G70 IK","G80 RG3","G90 RS4","GV70 JK1","GV80 JX1","GV60 GV"],
  "SsangYong / KGM":["Tivoli XLV","Korando C200","Rexton G4","Musso Q200","Torres J100"],
  "BYD":            ["Atto 3 BYD EA1","Han EV","Tang DM","Song Plus DM","Dolphin EA1","Seal DM5","Seagull EV"],
  "MG":             ["MG3 SZP1","MG4 MG EH32","MG5","MG ZS EV","MG HS","MG Marvel R","Cyberster"],
  "Ford":           ["Ka RU8","Fiesta MK6/MK7/MK8","Focus MK2/MK3/MK4","Focus ST","Focus RS MK3","Mondeo MK4/MK5","Puma MK2","Kuga MK1/MK2/MK3","Mustang S550/S650","Mustang Mach-E","Ranger T6/T7","F-150 P552/P702","Transit Custom MK1/MK2","Transit MK7/MK8","Galaxy MK3","S-Max MK2","Bronco U725","Maverick"],
  "Chevrolet":      ["Spark M300/M400","Aveo T300","Cruze J300","Malibu G1X","Camaro 6G","Corvette C7/C8","Equinox MK3","Trailblazer","Tahoe GMT900","Silverado T1","Bolt EV BEV2","Blazer EV"],
  "Dodge":          ["Charger LD","Challenger LC","Durango WD","Grand Caravan RT","Hornet"],
  "Jeep":           ["Renegade BU","Compass MP","Cherokee KL","Grand Cherokee WK2/WL","Wrangler JK/JL","Gladiator JT","Avenger E0"],
  "Chrysler":       ["300C LD","Voyager RG","Pacifica RU"],
  "Cadillac":       ["CT4 A1LL","CT5 A1XL","XT4 E2UX","XT5 C1UX","XT6 C1XL","Escalade GMT1XX","Lyriq"],
  "Tesla":          ["Model 3 SR/LR/P","Model Y AWD/P","Model S Plaid","Model X Plaid","Cybertruck"],
  "Rivian":         ["R1T","R1S"],
  "MAN Trucks":     ["TGX","TGS","TGM","TGL","TGE","Lion's Coach"],
  "Scania":         ["R Series","S Series","G Series","P Series","L Series","XT Series","Interlink"],
  "Volvo Trucks":   ["FH16","FH","FM","FMX","FL","FE"],
  "Iveco":          ["Daily VI","Eurocargo ML","S-Way","X-Way","Stralis IV","Trakker IV","Crossway LE"],
  "DAF":            ["XF 480/530","XG 480/530","XG+ 530","CF 330/400","LF 220/280","XB Electric"],
  "Mercedes Trucks":["Actros MP5","Arocs 3 axles","Atego 3","Antos","Econic 3","Unimog U5023"],
  "Renault Trucks": ["T 440/480/520","T High","C 440/480","K 380/430","D 210/250","D Wide","Master FV","Trafic FV"],
  "Honda Moto":     ["CB500F/X","CB650R","CB750 Hornet","CB1000R","CBR500R","CBR650R","CBR1000RR-R","Africa Twin CRF1100","NC750X","Forza 750","PCX125","SH350","Goldwing GL1800","CMX500 Rebel","XL750 Transalp"],
  "Yamaha Moto":    ["MT-03","MT-07","MT-09","MT-10","YZF-R3","YZF-R7","YZF-R1M","Tracer 7","Tracer 9 GT","Ténéré 700","XSR700","XSR900","XMAX 300","TMAX 560","Niken GT"],
  "Kawasaki":       ["Z400","Z650","Z900","Z900RS","Z1000SX","ZX-4RR","ZX-6R","ZX-10RR","Ninja 400","Ninja 650","Ninja 1000SX","H2","H2R","Versys 650","Versys 1000 SE","W800","KLR650"],
  "Suzuki Moto":    ["GSX-S750","GSX-S1000","GSX-R750","GSX-R1000R","V-Strom 650 XT","V-Strom 1050 DE","SV650","Hayabusa GSXR1300","Katana GSX1000S","Burgman 400"],
  "Ducati":         ["Monster SP 937","Panigale V2","Panigale V4 R","Multistrada V2 S","Multistrada V4 S","Scrambler Icon","SuperSport 950","Diavel V4","DesertX","Streetfighter V4 S","Hypermotard 950"],
  "KTM":            ["Duke 390","Duke 790","Duke 890 R","Duke 1290 Super","RC 390","Adventure 390","Adventure 890","Adventure 1290 S","Super Duke R 1290","EXC 300/500"],
  "BMW Moto":       ["G 310 R/GS","F 750 GS","F 850 GS Adv","F 900 R/XR","R 1250 GS Adv","R 1250 R/RS","R nineT Urban G/S","S 1000 RR M","S 1000 XR","M 1000 RR","CE 04"],
  "Triumph":        ["Street Triple 765 R/RS","Tiger 660 Sport","Tiger 900 GT","Tiger 1200 GT Pro","Speed Triple 1200 RS","Bonneville T100/T120","Trident 660","Rocket 3 GT","Thruxton RS"],
  "Harley-Davidson":["Sportster S RH1250S","Nightster RH975","Iron 883 XL883N","Fat Boy FLFBS","Fat Bob FXFBS","Road King FLHR","Road Glide FLTRX","Street Glide FLHX","Pan America RA1250S","Livewire"],
  "Aprilia":        ["RS 660","Tuono 660","Tuono V4 Factory","RSV4 Factory","Dorsoduro 900","Shiver 900","Caponord 1200"],
};

// ══════════════════════════════════════════════════════════
// CLASSIFICATION
// ══════════════════════════════════════════════════════════
const MOTOS = ["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Ducati","KTM","BMW Moto","Triumph","Harley-Davidson","Aprilia"];
const PL    = ["MAN Trucks","Scania","Volvo Trucks","Iveco","DAF","Mercedes Trucks","Renault Trucks"];

const BRAND_GROUPS = [
  { label:"🇫🇷 France",          brands:["Renault","Peugeot","Citroën","DS Automobiles","Dacia"] },
  { label:"🇩🇪 Allemagne",       brands:["Volkswagen","Audi","BMW","Mercedes-Benz","Opel / Vauxhall","Porsche"] },
  { label:"🇬🇧 Grande-Bretagne", brands:["Land Rover","Jaguar","MINI","Bentley","Rolls-Royce","Aston Martin"] },
  { label:"🇮🇹 Italie",          brands:["Fiat","Alfa Romeo","Lancia","Ferrari","Lamborghini","Maserati"] },
  { label:"🇪🇸 Espagne",         brands:["SEAT","Cupra"] },
  { label:"🇨🇿 Tchéquie",        brands:["Škoda"] },
  { label:"🇸🇪 Suède",           brands:["Volvo","Saab","Polestar"] },
  { label:"🇯🇵 Japon",           brands:["Toyota","Honda","Nissan","Mazda","Subaru","Mitsubishi","Suzuki","Lexus","Infiniti"] },
  { label:"🇰🇷 Corée",           brands:["Hyundai","Kia","Genesis","SsangYong / KGM"] },
  { label:"🇨🇳 Chine",           brands:["BYD","MG","Polestar"] },
  { label:"🇺🇸 États-Unis",      brands:["Ford","Chevrolet","Dodge","Jeep","Chrysler","Cadillac","Tesla","Rivian"] },
  { label:"🚛 Poids lourds",     brands:["MAN Trucks","Scania","Volvo Trucks","Iveco","DAF","Mercedes Trucks","Renault Trucks"] },
  { label:"🏍 Motos",            brands:["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Ducati","KTM","BMW Moto","Triumph","Harley-Davidson","Aprilia"] },
];

// ══════════════════════════════════════════════════════════
// BASE DE RECOMMANDATIONS — 100% CATALOGUE SHELL MAROC
//
// Chaque entrée contient :
//   produit       : produit disponible au Maroc
//   viscosité     : viscosité exacte
//   normes        : normes constructeur officielles
//   vidange       : intervalle de vidange
//   complement    : produit boîte/pont disponible au Maroc
//   raison        : explication technique
//   — Si le constructeur recommande un produit absent du catalogue Maroc :
//   alerteProduit : nom exact du produit recommandé par le constructeur
//   alerteRaison  : pourquoi ce produit est différent
// ══════════════════════════════════════════════════════════
const RECO = [

  // ════════════════════════════════
  // GROUPE VAG — Volkswagen
  // ════════════════════════════════
  { brands:["Volkswagen"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2/C3 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 508.00 (Longlife 3) pour les moteurs TSI/TDI récents. Disponible au Maroc en bidon 1L, 5L et fût 209L.",
    alerteProduit: null },

  { brands:["Volkswagen"], engine:"essence", yearMin:2000, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 502.00 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Conforme VW 502.00 pour les moteurs EA111/EA888 Gen 1&2. Disponible au Maroc en toutes tailles.",
    alerteProduit: null },

  { brands:["Volkswagen"], engine:"diesel", yearMin:2016, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 507.00 pour les TDI Euro 5/6 avec FAP. Formule Low-SAPS disponible au Maroc.",
    alerteProduit: null },

  { brands:["Volkswagen"], engine:"diesel", yearMin:1998, yearMax:2015,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 505.01 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme VW 505.01 pour les TDI à injection pompe-injecteur (PD). Disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // AUDI
  // ════════════════════════════════
  { brands:["Audi"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2/C3 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 / 504.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 508.00/504.00 pour les moteurs TFSI EA888 Gen 4 Audi récents. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["Audi"], engine:"essence", yearMin:2000, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 502.00 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme VW 502.00 pour les moteurs TFSI/FSI Audi ancienne génération.",
    alerteProduit: null },

  { brands:["Audi"], engine:"diesel", yearMin:2015, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 507.00 pour les TDI Audi Euro 6 avec FAP/SCR. Low-SAPS disponible au Maroc.",
    alerteProduit: null },

  { brands:["Audi"], engine:"diesel", yearMin:2000, yearMax:2014,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 505.01 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme VW 505.01 pour les TDI Audi à injection pompe-injecteur (PD).",
    alerteProduit: null },

  // ════════════════════════════════
  // SEAT / CUPRA / ŠKODA
  // ════════════════════════════════
  { brands:["SEAT","Cupra","Škoda"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2/C3 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 508.00 pour les moteurs EA211 evo et EA888 Gen 4 SEAT/Cupra/Škoda. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["SEAT","Cupra","Škoda"], engine:"essence", yearMin:2000, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 502.00 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme VW 502.00 pour les anciens moteurs SEAT/Škoda de la famille VAG.",
    alerteProduit: null },

  { brands:["SEAT","Cupra","Škoda"], engine:"diesel", yearMin:2016, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme VW 507.00 pour les TDI Euro 6 SEAT/Cupra/Škoda avec FAP. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["SEAT","Cupra","Škoda"], engine:"diesel", yearMin:2000, yearMax:2015,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"VW 505.01 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme VW 505.01 pour les TDI ancienne génération SEAT/Škoda.",
    alerteProduit: null },

  // ════════════════════════════════
  // BMW / MINI
  // ════════════════════════════════
  { brands:["BMW","MINI"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2/C3 0W-30", viscosité:"0W-30",
    normes:"BMW LL-17 FE+ · ACEA C5 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le constructeur BMW spécifie une viscosité 0W-30 approuvée LL-17 FE+. Le produit Shell Helix Ultra ECT C2/C3 0W-30 est la référence disponible au Maroc la plus proche.",
    alerteProduit:"Shell Helix Ultra 0W-30 (BMW LL-17 FE+)",
    alerteRaison:"BMW préconise idéalement le Shell Helix Ultra 0W-30 portant l'approbation BMW Longlife-17 FE+. Ce produit n'est pas au catalogue Maroc. Le Shell Helix Ultra ECT C2/C3 0W-30 est la meilleure alternative disponible (ACEA C2/C3, compatible 0W-30)." },

  { brands:["BMW","MINI"], engine:"essence", yearMin:2011, yearMax:2018,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"BMW LL-01 · ACEA A3/B4 · API SN", vidange:"20 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"BMW LL-01 pour les moteurs N-series (F-series). Le Shell Helix Ultra ECT C3 5W-30 est l'alternative 5W-30 disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 5W-30 (BMW LL-01)",
    alerteRaison:"BMW recommande idéalement Shell Helix Ultra 5W-30 avec approbation BMW LL-01 spécifique. Ce produit exact n'est pas au catalogue Maroc. Le Shell Helix Ultra ECT C3 5W-30 ou HX8 ECT 5W-30 C3 sont les meilleures alternatives disponibles." },

  { brands:["BMW","MINI"], engine:"essence", yearMin:2000, yearMax:2010,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"BMW LL-01 · ACEA A3/B4 · API SN", vidange:"20 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs BMW E-series (M52/M54/M56/N46/N52), la viscosité 5W-40 est recommandée. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["BMW","MINI"], engine:"diesel", yearMin:2015, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"BMW LL-04 · ACEA C3 · API CF", vidange:"25 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"BMW LL-04 pour les diesel B47/B57 Euro 6 avec FAP/SCR. Le Shell Helix Ultra ECT C3 5W-30 est disponible au Maroc et répond à la norme C3 Low-SAPS exigée.",
    alerteProduit: null },

  { brands:["BMW","MINI"], engine:"diesel", yearMin:2000, yearMax:2014,
    produit:"Shell Helix HX8 ECT 5W-30 C3", viscosité:"5W-30",
    normes:"BMW LL-04 · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme BMW LL-04 pour les diesel ancienne génération. Shell HX8 ECT 5W-30 C3 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // MERCEDES-BENZ
  // ════════════════════════════════
  { brands:["Mercedes-Benz"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"MB 229.71 · ACEA C5 · API SP", vidange:"25 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Mercedes spécifie la viscosité 0W-20 (MB 229.71) pour les moteurs M264/M256 2018+. Le Shell Helix Ultra ECT C6 0W-20 est la référence 0W-20 disponible au catalogue Shell Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (MB 229.71)",
    alerteRaison:"Mercedes recommande idéalement la Shell Helix Ultra 0W-20 portant l'approbation spécifique MB 229.71. Ce produit n'est pas au catalogue Maroc. Le Shell Helix Ultra ECT C6 0W-20 (ACEA C5, API SP) est la meilleure alternative disponible." },

  { brands:["Mercedes-Benz"], engine:"essence", yearMin:2000, yearMax:2017,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"MB 229.5 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme MB 229.5 pour les moteurs Mercedes essence ancienne génération (M270/M274/M156). Disponible au Maroc.",
    alerteProduit: null },

  { brands:["Mercedes-Benz"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"MB 229.52 · ACEA C3 · API CF", vidange:"25 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Norme MB 229.52 pour les diesel OM654/OM656 avec BlueTEC SCR et FAP. Low-SAPS disponible au Maroc.",
    alerteProduit: null },

  { brands:["Mercedes-Benz"], engine:"diesel", yearMin:2000, yearMax:2017,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"MB 229.5 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Norme MB 229.5 pour les diesel CDI OM651/OM642 ancienne génération. Disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // RENAULT / DACIA
  // ════════════════════════════════
  { brands:["Renault","Dacia"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra PRO AG 5W-30", viscosité:"5W-30",
    normes:"Renault RN 0700 · PSA B71 2312 · ACEA C2 · API SN", vidange:"20 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra PRO AG 5W-30 est une référence disponible au Maroc portant la norme Renault RN 0700 pour les moteurs TCe récents et hybrides E-Tech.",
    alerteProduit:"Shell Helix Ultra ECT C2 0W-20",
    alerteRaison:"Renault préconise idéalement une 0W-20 ACEA C2 (RN 0700) pour les TCe Gen2 et E-Tech 2019+. Cette viscosité n'est pas disponible au catalogue Maroc dans la gamme Helix. Le Shell Helix Ultra PRO AG 5W-30 (RN 0700) est la meilleure alternative disponible." },

  { brands:["Renault","Dacia"], engine:"essence", yearMin:2012, yearMax:2018,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"Renault RN 0700 · ACEA A3/B4 · API SN PLUS", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs TCe ancienne génération Renault/Dacia, le Shell Helix HX7 10W-40 est largement disponible au Maroc et adapté aux conditions climatiques marocaines.",
    alerteProduit:"Shell Helix HX7 5W-40",
    alerteRaison:"Renault recommande idéalement une viscosité 5W-40 pour ces moteurs en conditions hivernales. Le Shell HX7 5W-40 n'est pas au catalogue Maroc. Le HX7 10W-40 est l'alternative disponible, parfaitement adaptée au climat marocain." },

  { brands:["Renault","Dacia"], engine:"diesel", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra PRO AR-L 5W-30", viscosité:"5W-30",
    normes:"Renault RN 0720 · ACEA C3 · API CF", vidange:"20 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra PRO AR-L 5W-30 porte la norme Renault RN 0720. Disponible au Maroc en fût 209L — produit idéal pour les diesel Blue dCi avec FAP/SCR.",
    alerteProduit: null },

  { brands:["Renault","Dacia"], engine:"diesel", yearMin:2010, yearMax:2018,
    produit:"Shell Helix HX8 ECT 5W-30 C3", viscosité:"5W-30",
    normes:"Renault RN 0710 · ACEA B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les diesel dCi ancienne génération Renault/Dacia, le Shell HX8 ECT 5W-30 C3 disponible au Maroc assure la protection des injecteurs et du turbo.",
    alerteProduit:"Shell Helix HX7 AV 5W-30",
    alerteRaison:"Renault préconise idéalement le Shell HX7 AV 5W-30 (RN 0710 spécifique). Ce produit n'est pas au catalogue Maroc. Le Shell HX8 ECT 5W-30 C3 est la meilleure alternative disponible." },

  { brands:["Renault","Dacia"], engine:"essence", yearMin:1990, yearMax:2011,
    produit:"Shell Helix HX5 15W-40 SL CF", viscosité:"15W-40",
    normes:"API SL · ACEA A3/B3", vidange:"7 500 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les anciens moteurs Renault/Dacia atmosphériques, le HX5 15W-40 est la référence semi-synthétique disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // PEUGEOT / CITROËN / DS / OPEL (Stellantis)
  // ════════════════════════════════
  { brands:["Peugeot","Citroën","DS Automobiles","Opel / Vauxhall"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra PRO AG 5W-30", viscosité:"5W-30",
    normes:"PSA B71 2312 · ACEA C2 · API SN", vidange:"20 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra PRO AG 5W-30 porte la norme PSA B71 2312, disponible au Maroc. Recommandé pour les moteurs PureTech 100/130/155/180 récents.",
    alerteProduit: null },

  { brands:["Peugeot","Citroën","DS Automobiles","Opel / Vauxhall"], engine:"essence", yearMin:2005, yearMax:2018,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"PSA B71 2296 · ACEA A3/B4 · API SN PLUS", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs EP6/THP ancienne génération PSA, le HX7 10W-40 est disponible au Maroc. Adapté au climat marocain.",
    alerteProduit:"Shell Helix HX7 5W-40",
    alerteRaison:"PSA recommande idéalement une 5W-40 pour ces moteurs. Le HX7 5W-40 n'est pas au catalogue Maroc. Le HX7 10W-40 SN Plus est l'alternative disponible, adaptée aux températures marocaines." },

  { brands:["Peugeot","Citroën","DS Automobiles","Opel / Vauxhall"], engine:"diesel", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"PSA B71 2290 / B71 2312 · ACEA C3 · API CF", vidange:"20 000 km ou 2 ans",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra ECT C3 5W-30 répond aux normes PSA Stellantis pour les diesel BlueHDi avec FAP/SCR. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["Peugeot","Citroën","DS Automobiles","Opel / Vauxhall"], engine:"diesel", yearMin:2000, yearMax:2018,
    produit:"Shell Helix HX8 ECT 5W-30 C3", viscosité:"5W-30",
    normes:"PSA B71 2290 · ACEA B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les diesel HDi ancienne génération, le Shell HX8 ECT 5W-30 C3 est disponible au Maroc et protège les injecteurs common rail PSA.",
    alerteProduit:"Shell Helix HX7 AV 5W-30",
    alerteRaison:"PSA préconise idéalement le HX7 AV 5W-30 (B71 2290 spécifique). Ce produit n'est pas au catalogue Maroc. Le HX8 ECT 5W-30 C3 est la meilleure alternative disponible." },

  // ════════════════════════════════
  // FIAT / ALFA ROMEO / LANCIA
  // ════════════════════════════════
  { brands:["Fiat","Alfa Romeo","Lancia"], engine:"essence", yearMin:2014, yearMax:2099,
    produit:"Shell Helix Ultra PRO AG 5W-30", viscosité:"5W-30",
    normes:"Fiat 9.55535-GS1 · PSA B71 2312 · ACEA C2", vidange:"20 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra PRO AG 5W-30 (PSA B71 2312) est compatible avec les normes Fiat/Alfa récentes. Disponible au Maroc.",
    alerteProduit: null },

  { brands:["Fiat","Alfa Romeo","Lancia"], engine:"diesel", yearMin:2012, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Fiat 9.55535-S3 · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme Fiat 9.55535-S3 pour les diesel MultiJet II avec FAP. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Fiat","Alfa Romeo","Lancia"], engine:"essence", yearMin:1990, yearMax:2013,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les anciens moteurs Fiat/Alfa, le HX7 10W-40 est la référence semi-synthétique disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // TOYOTA / LEXUS
  // ════════════════════════════════
  { brands:["Toyota","Lexus"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Toyota 08880-80376 · ACEA A1/B1 · API SP ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Toyota exige la viscosité 0W-20 pour les moteurs Dynamic Force et hybrides THS. Le Shell Helix Ultra ECT C6 0W-20 est la référence 0W-20 disponible au catalogue Shell Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (Toyota 08880-80376)",
    alerteRaison:"Toyota préconise idéalement le Shell Helix Ultra 0W-20 avec approbation Toyota GF-6A/SP spécifique. Ce produit n'est pas au catalogue Maroc. Le Shell Helix Ultra ECT C6 0W-20 (ACEA C6, API SP) est la meilleure alternative disponible." },

  { brands:["Toyota","Lexus"], engine:"hybride", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Hybrid 0W-20 SP", viscosité:"0W-20",
    normes:"Toyota 08880-80376 · API SN PLUS · ILSAC GF-5 · ACEA A1/B1", vidange:"15 000 km",
    complement:"Spirax S5 CVT X",
    raison:"Le Shell Helix Hybrid 0W-20 SP est spécifiquement formulé pour les véhicules hybrides et disponible au Maroc. Parfait pour tous les hybrides Toyota/Lexus THS-II et THS-III.",
    alerteProduit: null },

  { brands:["Toyota","Lexus"], engine:"essence", yearMin:2000, yearMax:2017,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"Toyota 08880-80830 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs Toyota ancienne génération (1NR/2ZR/1KD), le HX7 10W-40 est disponible au Maroc et adapté au climat chaud marocain.",
    alerteProduit:"Shell Helix HX7 5W-30",
    alerteRaison:"Toyota recommande idéalement une viscosité 5W-30 pour ces moteurs en conditions hivernales. Ce produit exact n'est pas au catalogue Maroc. Le HX7 10W-40 est l'alternative la plus adaptée aux conditions marocaines." },

  { brands:["Toyota","Lexus"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Toyota 08880-80830 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Recommandation Toyota pour les diesel D-4D avec FAP. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Toyota","Lexus"], engine:"sport", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra Racing 10W-60", viscosité:"10W-60",
    normes:"Toyota Gazoo Racing · ACEA A3/B4 · API SN", vidange:"8 000 – 10 000 km",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra Racing 10W-60 est disponible au Maroc (20L). Recommandé pour Toyota GR86, GR Yaris, GR Supra et Lexus RC F / IS F.",
    alerteProduit: null },

  // ════════════════════════════════
  // HONDA
  // ════════════════════════════════
  { brands:["Honda"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Honda 08221-99974 · API SN PLUS · ILSAC GF-6A", vidange:"12 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Honda requiert la viscosité 0W-20 pour les VTEC Turbo récents. Le Shell Helix Ultra ECT C6 0W-20 est disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (Honda)",
    alerteRaison:"Honda recommande idéalement la Shell Helix Ultra 0W-20 avec approbation Honda spécifique. Le Shell Helix Ultra ECT C6 0W-20 est la meilleure alternative disponible au Maroc." },

  { brands:["Honda"], engine:"essence", yearMin:1990, yearMax:2017,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"API SN · ACEA A3/B4 · Honda HTO-06", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs VTEC Honda ancienne génération, le HX7 10W-40 est disponible au Maroc et bien adapté au climat chaud.",
    alerteProduit:"Shell Helix HX7 5W-30",
    alerteRaison:"Honda recommande idéalement une 5W-30 pour les VTEC atmosphériques. Ce produit n'est pas au catalogue Maroc. Le HX7 10W-40 SN Plus est l'alternative disponible, adaptée aux températures marocaines." },

  // ════════════════════════════════
  // NISSAN / INFINITI
  // ════════════════════════════════
  { brands:["Nissan","Infiniti"], engine:"essence", yearMin:2015, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Nissan 999MP-5W30P2 · API SN PLUS · ACEA A3/B4", vidange:"15 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Pour les moteurs Nissan récents, le Shell Helix Ultra ECT C3 5W-30 est disponible au Maroc et assure la protection des systèmes VVEL.",
    alerteProduit: null },

  { brands:["Nissan","Infiniti"], engine:"essence", yearMin:1990, yearMax:2014,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs Nissan ancienne génération, le HX7 10W-40 est la référence semi-synthétique disponible au Maroc.",
    alerteProduit: null },

  { brands:["Nissan","Infiniti"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Nissan 999MP-CF5W30 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Recommandation Nissan pour les diesel dCi avec FAP. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // MAZDA / SUBARU / MITSUBISHI
  // ════════════════════════════════
  { brands:["Mazda"], engine:"essence", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Mazda 0W-20 SN · API SP ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Mazda recommande la viscosité 0W-20 pour les SKYACTIV-G et SKYACTIV-X. Le Shell Helix Ultra ECT C6 0W-20 est disponible au Maroc.",
    alerteProduit: null },

  { brands:["Subaru"], engine:"essence", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Subaru SOA427V1410 · API SN · ACEA A3/B4", vidange:"12 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Subaru recommande la 5W-30 pour les boxers FA/FB. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Mitsubishi"], engine:"essence", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Mitsubishi DL0119B · API SN · ACEA A3/B4", vidange:"12 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Recommandation Mitsubishi pour les moteurs MIVEC. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // HYUNDAI / KIA / GENESIS
  // ════════════════════════════════
  { brands:["Hyundai","Kia","Genesis"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Hyundai 04E00-00020 · ACEA A1/B1 · API SP ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Spirax S5 CVT X",
    raison:"Hyundai/Kia recommande la viscosité 0W-20 pour les Smartstream récents. Le Shell Helix Ultra ECT C6 0W-20 est disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (Hyundai)",
    alerteRaison:"Hyundai recommande idéalement la Shell Helix Ultra 0W-20 avec approbation constructeur. Le Shell Helix Ultra ECT C6 0W-20 est la meilleure alternative disponible au Maroc." },

  { brands:["Hyundai","Kia","Genesis"], engine:"essence", yearMin:1998, yearMax:2017,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"Hyundai 04E00-00030 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs Hyundai/Kia ancienne génération, le HX7 10W-40 est disponible au Maroc.",
    alerteProduit: null },

  { brands:["Hyundai","Kia","Genesis"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Hyundai 04E00-00010 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Recommandation Hyundai/Kia pour les diesel CRDi avec FAP. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // VOLVO
  // ════════════════════════════════
  { brands:["Volvo"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Volvo VCC-RBS2AE · ACEA A1/B1 · API SN PLUS", vidange:"20 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Volvo exige la viscosité 0W-20 (VCC-RBS2AE) pour les Drive-E récents. Shell Helix Ultra ECT C6 0W-20 disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (Volvo VCC-RBS2AE)",
    alerteRaison:"Volvo recommande idéalement la Shell Helix Ultra 0W-20 avec approbation VCC-RBS2AE. Le Shell Helix Ultra ECT C6 0W-20 est la meilleure alternative disponible au Maroc." },

  { brands:["Volvo"], engine:"essence", yearMin:2000, yearMax:2017,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Volvo VCC-RBS2AE · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs Volvo ancienne génération (B4/B5), Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Volvo"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Volvo VCC-RBS2AJ · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme Volvo VCC-RBS2AJ pour les diesel Drive-E avec SCR/AdBlue. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // FORD
  // ════════════════════════════════
  { brands:["Ford"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"Ford WSS-M2C947-B1 · API SN PLUS · ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Ford préconise la viscosité 0W-20 pour les EcoBoost récents. Shell Helix Ultra ECT C6 0W-20 disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra ECT C2 0W-20",
    alerteRaison:"Ford recommande idéalement la Shell Helix Ultra ECT C2 0W-20 (WSS-M2C947-B1). Le Shell Helix Ultra ECT C6 0W-20 est la référence 0W-20 disponible au Maroc, proche en spécifications." },

  { brands:["Ford"], engine:"essence", yearMin:2000, yearMax:2017,
    produit:"Shell Helix HX7 10W-40 SN Plus", viscosité:"10W-40",
    normes:"Ford WSS-M2C913-D · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs Duratec/EcoBoost anciens, le HX7 10W-40 est disponible au Maroc.",
    alerteProduit:"Shell Helix HX7 5W-20 ou 5W-30",
    alerteRaison:"Ford recommande idéalement une viscosité 5W-20 ou 5W-30 pour ces moteurs. Ces produits ne sont pas au catalogue Maroc. Le HX7 10W-40 est l'alternative disponible, bien adaptée au climat marocain." },

  { brands:["Ford"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Ford WSS-M2C917-A · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme Ford WSS-M2C917-A pour les EcoBlue avec FAP. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Ford"], engine:"diesel", yearMin:2000, yearMax:2017,
    produit:"Shell Helix HX8 ECT 5W-30 C3", viscosité:"5W-30",
    normes:"Ford WSS-M2C913-D · ACEA B3/B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les diesel TDCi ancienne génération Ford, le Shell HX8 ECT 5W-30 C3 est disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // LAND ROVER / JAGUAR
  // ════════════════════════════════
  { brands:["Land Rover","Jaguar"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C6 0W-20", viscosité:"0W-20",
    normes:"JLR STJLR.51.5122 · ACEA C5 · API SP", vidange:"21 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"JLR exige la viscosité 0W-20 pour les moteurs Ingenium récents. Shell Helix Ultra ECT C6 0W-20 disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-20 (JLR STJLR.51.5122)",
    alerteRaison:"JLR recommande idéalement la Shell Helix Ultra 0W-20 avec approbation JLR spécifique. Le Shell Helix Ultra ECT C6 0W-20 est la meilleure alternative disponible au Maroc." },

  { brands:["Land Rover","Jaguar"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"JLR STJLR.51.5006 · ACEA C3 · API CF", vidange:"21 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Norme JLR pour les diesel Ingenium avec FAP/SCR. Shell Helix Ultra ECT C3 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Land Rover","Jaguar"], engine:"essence", yearMin:2000, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"JLR STJLR.51.5005 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs JLR ancienne génération (AJ-V6/V8), Shell Helix Ultra 5W-40 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // PORSCHE
  // ════════════════════════════════
  { brands:["Porsche"], engine:"essence", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra 5W-40 SN Plus", viscosité:"5W-40",
    normes:"Porsche A40 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra 5W-40 répond à la norme Porsche A40 et est disponible au Maroc.",
    alerteProduit:"Shell Helix Ultra 0W-40 PurePlus (Porsche C20)",
    alerteRaison:"Porsche préconise idéalement la Shell Helix Ultra 0W-40 PurePlus avec approbation Porsche C20. Ce produit n'est pas disponible au Maroc. Le Shell Helix Ultra 5W-40 SN Plus est la meilleure alternative disponible au Maroc (conforme Porsche A40)." },

  // ════════════════════════════════
  // FERRARI / LAMBORGHINI / BENTLEY / ROLLS-ROYCE / ASTON MARTIN / MASERATI
  // ════════════════════════════════
  { brands:["Ferrari","Lamborghini","Bentley","Rolls-Royce","Aston Martin","Maserati"], engine:"essence", yearMin:2000, yearMax:2099,
    produit:"Shell Helix Ultra Racing 10W-60", viscosité:"10W-60",
    normes:"Ferrari approbation officielle · ACEA A3/B4 · API SN PLUS", vidange:"10 000 – 15 000 km",
    complement:"Spirax S6 GXME Ultra 75W-80",
    raison:"Le Shell Helix Ultra Racing 10W-60 est disponible au Maroc (20L) et recommandé pour les moteurs haute performance V8/V10/V12. Huile officielle développée avec la Scuderia Ferrari.",
    alerteProduit:"Shell Helix Ultra 0W-40 PurePlus",
    alerteRaison:"Pour certaines supercars (Lamborghini Huracán, Bentley, Rolls-Royce), le constructeur recommande la Shell Helix Ultra 0W-40 PurePlus. Ce produit n'est pas au catalogue Maroc. Le Shell Helix Ultra Racing 10W-60 est la meilleure alternative disponible." },

  // ════════════════════════════════
  // VÉHICULES ÉLECTRIQUES
  // ════════════════════════════════
  { brands:["Tesla","Polestar","Rivian","BYD","MG"], engine:"électrique", yearMin:2012, yearMax:2099,
    produit:"Spirax S6 ATF ZM", viscosité:"N/A",
    normes:"ATF synthétique · Compatibilité EV", vidange:"100 000 km",
    complement:"Shell Brake & Clutch Fluid DOT 4",
    raison:"Pour les groupes motopropulseurs électriques, le Spirax S6 ATF ZM disponible au Maroc assure la lubrification des réducteurs EV.",
    alerteProduit:"Shell Transmission Fluid EV",
    alerteRaison:"Les constructeurs EV (Tesla, Polestar, BYD) recommandent idéalement le Shell Transmission Fluid EV dédié aux véhicules électriques. Ce produit n'est pas au catalogue Maroc. Le Spirax S6 ATF ZM est l'alternative disponible." },

  // ════════════════════════════════
  // POIDS LOURDS
  // ════════════════════════════════
  { brands:["MAN Trucks"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R6 LME Plus 5W-30", viscosité:"5W-30",
    normes:"MAN M3477 · ACEA E6/E9 · API CK-4", vidange:"120 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Le Shell Rimula R6 LME Plus 5W-30 est disponible au Maroc et répond à la norme MAN M3477 pour les moteurs D20/D26/D38 Euro 6.",
    alerteProduit: null },

  { brands:["Scania"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R6 LME Plus 5W-30", viscosité:"5W-30",
    normes:"Scania LDF-3 · ACEA E6/E9 · API CK-4", vidange:"150 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Approbation Scania LDF-3 pour les moteurs DC09/DC13/DC16. Shell Rimula R6 LME Plus 5W-30 disponible au Maroc.",
    alerteProduit: null },

  { brands:["Volvo Trucks"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R6 LM 10W-40", viscosité:"10W-40",
    normes:"Volvo VDS-4.5 · ACEA E7/E9 · API CK-4", vidange:"100 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Shell Rimula R6 LM 10W-40 disponible au Maroc. Répond à la norme Volvo VDS-4.5 pour les moteurs D11/D13/D16.",
    alerteProduit: null },

  { brands:["DAF"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R5 LE 10W-40 CK-4", viscosité:"10W-40",
    normes:"DAF Extended Drain · ACEA E6/E9 · API CK-4", vidange:"100 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Shell Rimula R5 LE 10W-40 CK-4 disponible au Maroc. Adapté aux moteurs MX-11/MX-13 DAF Euro 6.",
    alerteProduit: null },

  { brands:["Iveco"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R4 X 15W-40", viscosité:"15W-40",
    normes:"Iveco TLS 2-35975-2 · ACEA E7 · API CI-4+", vidange:"80 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Shell Rimula R4 X 15W-40 disponible au Maroc en bidon, fût et IBC 1000L. Norme Iveco TLS pour les Cursor 9/11/13.",
    alerteProduit: null },

  { brands:["Mercedes Trucks","Renault Trucks"], engine:"diesel", yearMin:2000, yearMax:2099,
    produit:"Shell Rimula R6 LM 10W-40", viscosité:"10W-40",
    normes:"MB 228.51 · ACEA E7/E9 · API CK-4 · Renault VI RLD-3", vidange:"100 000 km ou 1 an",
    complement:"Spirax S6 AXME 75W-90",
    raison:"Double approbation MB 228.51 et Renault Trucks RLD-3. Shell Rimula R6 LM 10W-40 disponible au Maroc.",
    alerteProduit: null },

  // ════════════════════════════════
  // MOTOS
  // ════════════════════════════════
  { brands:["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Aprilia"], engine:"essence", yearMin:1990, yearMax:2099,
    produit:"Shell Advance 4T Ultra 10W-40 SP", viscosité:"10W-40",
    normes:"JASO MA2 · API SN · Honda HP4M · Yamaha LM TW", vidange:"6 000 – 8 000 km",
    complement:"Spirax S2 G 80W-90",
    raison:"Le Shell Advance 4T Ultra 10W-40 SP est disponible au Maroc. Certifié JASO MA2, avec approbations Honda et Yamaha officielles.",
    alerteProduit: null },

  { brands:["BMW Moto"], engine:"essence", yearMin:1990, yearMax:2099,
    produit:"Shell Advance 4T Ultra 15W-50", viscosité:"15W-50",
    normes:"BMW Motorrad · JASO MA2 · API SN", vidange:"10 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Le Shell Advance 4T Ultra 15W-50 est disponible au Maroc. Viscosité recommandée par BMW Motorrad pour les boxers R-series et les 4 cylindres S-series.",
    alerteProduit: null },

  { brands:["Ducati","KTM","Triumph"], engine:"essence", yearMin:1990, yearMax:2099,
    produit:"Shell Advance 4T Ultra 10W-40 SP", viscosité:"10W-40",
    normes:"JASO MA2 · API SN · Ducati TF", vidange:"6 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"Pour les moteurs sportifs Ducati, KTM et Triumph, le Shell Advance 4T Ultra 10W-40 SP est disponible au Maroc.",
    alerteProduit:"Shell Advance Ultra 4T 10W-50",
    alerteRaison:"Ducati/KTM recommandent idéalement une viscosité 10W-50 pour une protection optimale à haute température. Ce produit n'est pas au catalogue Maroc. Le Shell Advance 4T Ultra 10W-40 SP est l'alternative disponible." },

  { brands:["Harley-Davidson"], engine:"essence", yearMin:1990, yearMax:2099,
    produit:"Shell Advance 4T AX3 20W-50", viscosité:"20W-50",
    normes:"Harley-Davidson SAE 20W50 · JASO MA · API SJ/SL", vidange:"8 000 km ou 1 an",
    complement:"Spirax S2 G 80W-90",
    raison:"La viscosité 20W-50 est obligatoire sur tous les V-Twin Harley-Davidson. Le Shell Advance 4T AX3 20W-50 est disponible au Maroc.",
    alerteProduit: null },
];

// ════════════════════════════════
// BASE INDUSTRIE — 100% CATALOGUE SHELL MAROC
// ════════════════════════════════
const INDUSTRIE_DB = [
  { equipType:"pompe hydraulique", tempRange:["froid","normal"], loadType:["légère","modérée"],
    produit:"Shell Tellus S2 M 46", viscosité:"ISO VG 46",
    normes:"ISO 11158 HM · DIN 51524-2 HLP · Denison HF-0/1/2", intervalle:"4 000 h ou 1 an",
    vigilance:"Contrôler la propreté du circuit (ISO 16/14/11). Surveiller la température de retour.",
    raison:"Disponible au Maroc en fût 209L et bidon 20L. Huile hydraulique minérale polyvalente pour systèmes industriels courants." },
  { equipType:"pompe hydraulique", tempRange:["chaud","extrême"], loadType:["lourde","extrême"],
    produit:"Shell Tellus S2 V 46", viscosité:"ISO VG 46",
    normes:"ISO 11158 HV · DIN 51524-3 HVLP · Vickers M2950", intervalle:"6 000 h ou 2 ans",
    vigilance:"Surveiller la viscosité à chaud. Adapter la filtration si contamination.",
    raison:"Disponible au Maroc. Formule à indice de viscosité élevé, stable sur large plage de température — idéal pour le climat marocain (chaleur estivale)." },
  { equipType:"compresseur", tempRange:["froid","normal","chaud"], loadType:["légère","modérée"],
    produit:"Shell Corena S3 R 68", viscosité:"ISO VG 68",
    normes:"ISO 6743-3A DAA/DAB · DIN 51506 VDL", intervalle:"4 000 h",
    vigilance:"Vidanger à chaud. Remplacer le filtre séparateur simultanément.",
    raison:"Disponible au Maroc en bidon 20L. Protection pour compresseurs rotatifs à vis en conditions standards." },
  { equipType:"compresseur", tempRange:["extrême"], loadType:["lourde","extrême"],
    produit:"Shell Corena S4 R 46", viscosité:"ISO VG 46",
    normes:"ISO 6743-3A DAA · Atlas Copco Roto-Xtend · Kaeser Sigma Fluid S-460", intervalle:"8 000 h",
    vigilance:"Filtres certifiés obligatoires. Analyse d'huile tous les 2 000 h.",
    raison:"Disponible au Maroc en bidon 20L et fût 209L. Synthétique haute performance pour compresseurs sous forte charge continue." },
  { equipType:"réducteur / engrenage", tempRange:["froid","normal","chaud"], loadType:["légère","modérée","lourde"],
    produit:"Shell Omala S2 GX 220", viscosité:"ISO VG 220",
    normes:"ISO 12925-1 CKC/CKD · AGMA 9005-F16 · DIN 51517-3", intervalle:"5 000 h ou 1 an",
    vigilance:"Contrôler le niveau avant démarrage. Nettoyer le filtre magnétique.",
    raison:"Disponible au Maroc en bidon 20L et fût 209L. Huile EP pour engrenages, résistante aux chocs et au micropitting." },
  { equipType:"réducteur / engrenage", tempRange:["extrême"], loadType:["extrême"],
    produit:"Shell Omala S4 GXV 220", viscosité:"ISO VG 220",
    normes:"ISO 12925-1 CKD · Flender EXTRA · David Brown S1.53.101", intervalle:"10 000 h ou 2 ans",
    vigilance:"Ne pas mélanger avec huiles minérales.",
    raison:"Disponible au Maroc en fût 209L. Synthétique de pointe, réduit 40% les pertes par friction dans les réducteurs sous forte charge." },
  { equipType:"convoyeur", tempRange:["froid","normal","chaud","extrême"], loadType:["légère","modérée","lourde","extrême"],
    produit:"Shell Gadus S3 V220C 2", viscosité:"NLGI 2",
    normes:"DIN 51825 KP2K-30 · ISO 12924", intervalle:"500 – 1 000 h",
    vigilance:"Regraisser plus fréquemment en milieu humide. Purger avant application.",
    raison:"Disponible au Maroc en cartouche 0,4 kg, seau 18 kg et fût 180 kg. Graisse lithium complexe résistante à l'eau et aux températures élevées." },
  { equipType:"machine-outil", tempRange:["froid","normal"], loadType:["légère","modérée"],
    produit:"Shell Morlina S2 BA 100", viscosité:"ISO VG 100",
    normes:"ISO 6743-7 FD · DIN 51519 VG 100", intervalle:"2 000 h ou 6 mois",
    vigilance:"Filtrer finement (< 10 µm). Maintenir le niveau du bain.",
    raison:"Disponible au Maroc en fût 209L. Huile circulante pour broches et glissières, anti-mousse et protection rouille." },
  { equipType:"turbine", tempRange:["chaud","extrême"], loadType:["modérée","lourde"],
    produit:"Shell Turbo S4 GX 32", viscosité:"ISO VG 32",
    normes:"ISO 6743-5 TD/TG · GE GEK 107395 · Siemens TLV 901304", intervalle:"20 000 – 40 000 h",
    vigilance:"Surveiller le TAN et l'oxydation. Analyses d'huile tous les 3 mois.",
    raison:"Disponible au Maroc en fût 209L. Synthétique pour turbines vapeur et gaz, résistance à l'oxydation exceptionnelle." },
  { equipType:"groupe électrogène", tempRange:["froid","normal","chaud"], loadType:["modérée","lourde"],
    produit:"Shell Rimula R4 X 15W-40", viscosité:"15W-40",
    normes:"ACEA E7 · API CI-4 PLUS · Caterpillar ECF-2", intervalle:"500 h ou 1 an",
    vigilance:"Vérifier le niveau toutes les 50 h. Respecter les intervalles en usage stationnaire.",
    raison:"Disponible au Maroc en bidon 1L, 5L, 20L, fût 209L et IBC 1000L. Robuste pour groupes électrogènes, protection contre les boues à basse température." },
];

// ════════════════════════════════
// MOTEUR DE RECOMMANDATION
// ════════════════════════════════
function recommend(sector, fields) {
  if (sector !== "auto") {
    const et = (fields.equipType || "").toLowerCase();
    const tr = (fields.tempRange  || "").toLowerCase();
    const lt = (fields.loadType   || "").toLowerCase();
    let best = null, bestScore = -1;
    for (const r of INDUSTRIE_DB) {
      if (!et.includes(r.equipType) && !r.equipType.includes(et)) continue;
      let s = 3;
      if (tr && r.tempRange.some(t => tr.includes(t))) s += 2;
      if (lt && r.loadType.some(l => lt.includes(l))) s += 2;
      if (s > bestScore) { bestScore = s; best = r; }
    }
    return best;
  }
  const { brand, model, engine, year } = fields;
  const e  = (engine || "").toLowerCase();
  const y  = parseInt(year) || 2020;
  const mo = (model  || "").toLowerCase();
  let best = null, bestScore = -1;
  for (const r of RECO) {
    if (!r.brands.includes(brand)) continue;
    if (r.engine !== e) continue;
    if (y < r.yearMin || y > r.yearMax) continue;
    let score = 10;
    if (r.models && r.models.length > 0) {
      const match = r.models.some(m => {
        const ml = m.toLowerCase();
        return mo.includes(ml) || ml.includes(mo) || mo.split(/[\s\/]/)[0] === ml.split(/[\s\/]/)[0];
      });
      score += match ? 20 : -5;
    }
    score += Math.min((r.yearMin - 2000) / 2, 8);
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best;
}

// ════════════════════════════════
// UI
// ════════════════════════════════
const S = { bg:"#F4F1EB", dark:"#0F0F0F", red:"#DD1D21", yellow:"#FBCE07", white:"#FFFFFF", border:"#DDD9D0", muted:"#888", text:"#222", orange:"#E8630A" };
const selSt = { width:"100%", border:`1.5px solid ${S.border}`, borderRadius:6, padding:"10px 12px", fontFamily:"inherit", fontSize:14, color:S.text, background:S.white, outline:"none", appearance:"none", boxSizing:"border-box", cursor:"pointer", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:36 };
const inpSt = { width:"100%", border:`1.5px solid ${S.border}`, borderRadius:6, padding:"10px 12px", fontFamily:"inherit", fontSize:14, color:S.text, background:S.white, outline:"none", appearance:"none", boxSizing:"border-box" };
const Lbl  = ({ t, req }) => <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:S.muted, marginBottom:6 }}>{t}{req && <span style={{ color:S.red }}> *</span>}</div>;
const G2   = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>{children}</div>;
const Chip = ({ label, active, onClick }) => <button onClick={onClick} style={{ border:`1.5px solid ${active?S.red:S.border}`, borderRadius:20, padding:"6px 14px", cursor:"pointer", background:active?"#fff0f0":S.white, fontFamily:"inherit", fontSize:12, fontWeight:active?700:400, color:active?S.red:S.muted }}>{label}</button>;
const ShellLogo = () => <svg width="36" height="36" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FBCE07"/><path d="M50 8C28 8 12 24 12 46c0 11 5 21 13 28l11-8c-6-5-10-12-10-20 0-14 11-25 24-25s24 11 24 25c0 8-4 15-10 20l11 8c8-7 13-17 13-28C88 24 72 8 50 8z" fill="#DD1D21"/><path d="M36 66l14 26 14-26c-5 4-9.5 6-14 6s-9-2-14-6z" fill="#DD1D21"/></svg>;

export default function App() {
  const [sector,       setSector]      = useState("auto");
  const [brand,        setBrand]       = useState("");
  const [model,        setModel]       = useState("");
  const [year,         setYear]        = useState("");
  const [engine,       setEngine]      = useState("");
  const [brandSearch,  setBrandSearch] = useState("");
  const [equipType,    setEquipType]   = useState("");
  const [manufacturer, setManufacturer]= useState("");
  const [machineModel, setMachineModel]= useState("");
  const [tempRange,    setTempRange]   = useState("");
  const [loadType,     setLoadType]    = useState("");
  const [result,       setResult]      = useState(null);
  const [noMatch,      setNoMatch]     = useState(false);
  const [searched,     setSearched]    = useState(false);

  const models   = brand && VEHICLES[brand] ? VEHICLES[brand] : [];
  const isMoto   = ["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Ducati","KTM","BMW Moto","Triumph","Harley-Davidson","Aprilia"].includes(brand);
  const isPL     = ["MAN Trucks","Scania","Volvo Trucks","Iveco","DAF","Mercedes Trucks","Renault Trucks"].includes(brand);
  const engines  = isMoto ? ["Essence"] : isPL ? ["Diesel"] : ["Essence","Diesel","Hybride","Électrique","Sport"];

  function handleBrand(b) { setBrand(b); setModel(""); setEngine(""); }

  const filteredGroups = BRAND_GROUPS
    .map(g => ({ ...g, brands: g.brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())) }))
    .filter(g => g.brands.length > 0);

  function search() {
    setSearched(true); setNoMatch(false); setResult(null);
    const fields = sector === "auto"
      ? { brand, model, year, engine }
      : { equipType, manufacturer, machineModel, tempRange, loadType };
    const rec = recommend(sector, fields);
    if (rec) setResult(rec); else setNoMatch(true);
  }

  function reset() {
    setBrand(""); setModel(""); setYear(""); setEngine(""); setBrandSearch("");
    setEquipType(""); setManufacturer(""); setMachineModel(""); setTempRange(""); setLoadType("");
    setResult(null); setNoMatch(false); setSearched(false);
  }

  const canSearch = sector === "auto" ? !!engine : !!equipType;
  const years = Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:S.bg, minHeight:"100vh" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} select:focus,input:focus{border-color:#FBCE07!important;box-shadow:0 0 0 3px rgba(251,206,7,.15)}`}</style>

      {/* NAV */}
      <div style={{ background:S.dark, height:54, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <ShellLogo />
          <span style={{ fontSize:17, fontWeight:800, color:S.white }}>Shell <span style={{ color:S.yellow }}>LubriGuide</span></span>
        </div>
        <div style={{ background:S.red, color:S.white, fontSize:9, fontWeight:800, letterSpacing:2, padding:"3px 8px", borderRadius:2 }}>🇲🇦 MAROC</div>
      </div>

      {/* HERO */}
      <div style={{ background:S.dark, padding:"32px 20px 26px", borderBottom:`4px solid ${S.yellow}` }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:4, textTransform:"uppercase", color:S.yellow, marginBottom:8 }}>Portefeuille Shell Maroc</div>
        <div style={{ fontSize:"clamp(22px,5vw,44px)", fontWeight:900, lineHeight:1.1, color:S.white, marginBottom:10 }}>
          Lubrifiant Shell disponible<br /><span style={{ color:S.yellow }}>au Maroc · Specs constructeur</span>
        </div>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12, lineHeight:1.7 }}>
          Recommandations basées exclusivement sur le catalogue Shell Maroc · Alertes si produit absent du portefeuille
        </p>
      </div>

      {/* TABS */}
      <div style={{ background:S.dark, padding:"0 20px 16px", display:"flex", gap:8 }}>
        {[["auto","🚗","Automobile / Moto / PL"],["industrie","⚙️","Industrie / Machines"]].map(([s,icon,lbl]) => (
          <button key={s} onClick={() => { setSector(s); reset(); }} style={{ flex:1, border:"none", borderRadius:6, padding:"10px 8px", cursor:"pointer", fontFamily:"inherit", background:sector===s?S.yellow:"rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:16 }}>{icon}</span>
            <span style={{ fontSize:11, fontWeight:700, color:sector===s?S.dark:"rgba(255,255,255,0.55)", textAlign:"center" }}>{lbl}</span>
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"24px 16px 60px" }}>
        <div style={{ background:S.white, borderRadius:10, border:`1px solid ${S.border}`, overflow:"hidden", marginBottom:20 }}>
          <div style={{ background:"#1a1a1a", padding:"12px 18px", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:20, height:20, borderRadius:"50%", background:S.yellow, color:S.dark, fontWeight:900, fontSize:11, display:"flex", alignItems:"center", justifyContent:"center" }}>1</div>
            <span style={{ fontWeight:700, color:S.white, fontSize:13 }}>Décrivez votre équipement</span>
          </div>

          <div style={{ padding:18 }}>
            {sector === "auto" && (
              <>
                <div style={{ marginBottom:14 }}>
                  <Lbl t="Marque du véhicule" />
                  <input style={{ ...inpSt, marginBottom:6 }} placeholder="🔍 Rechercher une marque…" value={brandSearch} onChange={e => setBrandSearch(e.target.value)} />
                  <select style={selSt} value={brand} onChange={e => handleBrand(e.target.value)}>
                    <option value="">— Sélectionnez une marque —</option>
                    {filteredGroups.map(g => (
                      <optgroup key={g.label} label={g.label}>
                        {g.brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </optgroup>
                    ))}
                  </select>
                  {brand && <div style={{ marginTop:6, fontSize:12, color:S.muted }}>✓ <strong style={{ color:S.text }}>{brand}</strong> <button onClick={() => handleBrand("")} style={{ marginLeft:8, background:"none", border:"none", color:S.red, cursor:"pointer", fontSize:11 }}>× Changer</button></div>}
                </div>

                {brand && models.length > 0 && (
                  <div style={{ marginBottom:14 }}>
                    <Lbl t="Modèle" />
                    <select style={selSt} value={model} onChange={e => setModel(e.target.value)}>
                      <option value="">— Sélectionnez un modèle —</option>
                      {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {model && <div style={{ marginTop:4, fontSize:11, color:"#2d9e2d" }}>✓ Recommandation adaptée au modèle exact</div>}
                  </div>
                )}

                <G2>
                  <div>
                    <Lbl t="Année" />
                    <select style={selSt} value={year} onChange={e => setYear(e.target.value)}>
                      <option value="">— Année —</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <Lbl t="Motorisation" req />
                    <select style={selSt} value={engine} onChange={e => setEngine(e.target.value)}>
                      <option value="">— Moteur —</option>
                      {engines.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                </G2>
              </>
            )}

            {sector === "industrie" && (
              <>
                <div style={{ marginBottom:14 }}>
                  <Lbl t="Type d'équipement" req />
                  <select style={selSt} value={equipType} onChange={e => setEquipType(e.target.value)}>
                    <option value="">— Sélectionnez un type —</option>
                    {["Pompe hydraulique","Compresseur","Réducteur / engrenage","Convoyeur","Machine-outil","Turbine","Groupe électrogène"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <G2>
                  <div><Lbl t="Fabricant" /><input style={inpSt} value={manufacturer} onChange={e => setManufacturer(e.target.value)} placeholder="ex: Atlas Copco…" /></div>
                  <div><Lbl t="Modèle / Réf." /><input style={inpSt} value={machineModel} onChange={e => setMachineModel(e.target.value)} placeholder="ex: GA 15…" /></div>
                </G2>
                <div style={{ marginBottom:14 }}>
                  <Lbl t="Température de service" />
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {["Froid","Normal","Chaud","Extrême"].map(t => <Chip key={t} label={t} active={tempRange===t} onClick={() => setTempRange(t===tempRange?"":t)} />)}
                  </div>
                </div>
                <div style={{ marginBottom:6 }}>
                  <Lbl t="Charge de travail" />
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {["Légère","Modérée","Lourde","Extrême"].map(l => <Chip key={l} label={l} active={loadType===l} onClick={() => setLoadType(l===loadType?"":l)} />)}
                  </div>
                </div>
              </>
            )}

            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={search} disabled={!canSearch} style={{ flex:1, background:canSearch?S.red:"#ccc", color:S.white, border:"none", borderRadius:6, padding:"13px", fontWeight:800, fontSize:15, cursor:canSearch?"pointer":"not-allowed", fontFamily:"inherit" }}>
                🔍 Trouver le lubrifiant Shell Maroc
              </button>
              {searched && <button onClick={reset} style={{ background:"none", border:`1px solid ${S.border}`, borderRadius:6, padding:"13px 18px", fontSize:13, color:S.muted, cursor:"pointer", fontFamily:"inherit" }}>↺</button>}
            </div>
          </div>
        </div>

        {/* RÉSULTAT */}
        {result && (
          <div style={{ animation:"fadeUp 0.4s ease" }}>
            {/* RECAP */}
            {sector === "auto" && brand && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                <span style={{ background:S.dark, color:S.yellow, fontWeight:700, fontSize:12, padding:"4px 12px", borderRadius:20 }}>
                  {brand}{model?` · ${model}`:""}{year?` · ${year}`:""}{engine?` · ${engine}`:""}
                </span>
              </div>
            )}

            {/* ⚠️ ALERTE PRODUIT ABSENT DU CATALOGUE MAROC */}
            {result.alerteProduit && (
              <div style={{ background:"#FFF3E0", border:`2px solid ${S.orange}`, borderRadius:10, padding:"14px 18px", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>⚠️</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:12, color:S.orange, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
                      Produit recommandé par le constructeur — Non disponible au Maroc
                    </div>
                    <div style={{ fontWeight:700, fontSize:13, color:"#333", marginBottom:4 }}>
                      {result.alerteProduit}
                    </div>
                    <div style={{ fontSize:12, color:"#666", lineHeight:1.6 }}>
                      {result.alerteRaison}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUIT DISPONIBLE AU MAROC */}
            <div style={{ background:S.dark, borderRadius:10, padding:"20px", marginBottom:14, borderLeft:`5px solid ${S.yellow}` }}>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:4 }}>
                🛢️ {result.alerteProduit ? "Meilleure alternative disponible au Maroc" : "Produit Shell Maroc recommandé"}
              </div>
              <div style={{ fontSize:22, fontWeight:900, color:S.white, lineHeight:1.2 }}>{result.produit}</div>
              {result.viscosité && result.viscosité !== "N/A" && (
                <span style={{ display:"inline-block", marginTop:8, background:S.yellow, color:S.dark, fontFamily:"monospace", fontWeight:700, fontSize:12, padding:"3px 10px", borderRadius:3 }}>
                  Viscosité : {result.viscosité}
                </span>
              )}
              <div style={{ marginTop:12, fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.7 }}>{result.raison}</div>
            </div>

            {/* DÉTAILS */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))", gap:12, marginBottom:12 }}>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>📋 Normes constructeur</div>
                <div style={{ fontSize:11, color:S.text, lineHeight:1.9, fontFamily:"monospace" }}>{result.normes}</div>
              </div>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>🔁 {result.vidange ? "Intervalle vidange" : "Intervalle"}</div>
                <div style={{ fontSize:14, fontWeight:700, color:S.text }}>{result.vidange || result.intervalle}</div>
              </div>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>{result.complement ? "➕ Complémentaire" : "⚠️ Vigilance"}</div>
                <div style={{ fontSize:12, color:S.text, lineHeight:1.6 }}>{result.complement || result.vigilance}</div>
              </div>
            </div>

            {result.vigilance && result.complement && (
              <div style={{ background:"#FFF8E1", border:`1px solid ${S.yellow}`, borderRadius:8, padding:"12px 16px", fontSize:12, color:"#555", lineHeight:1.7, marginBottom:12 }}>
                <strong>⚠️ Point de vigilance :</strong> {result.vigilance}
              </div>
            )}

            <div style={{ background:"#f9f9f9", border:`1px solid ${S.border}`, borderRadius:6, padding:"10px 14px", fontSize:11, color:S.muted, lineHeight:1.6 }}>
              ℹ️ Recommandations basées sur le portefeuille Shell Maroc. En cas de doute, consultez votre distributeur Shell agréé ou le carnet d'entretien du véhicule.
            </div>
          </div>
        )}

        {noMatch && (
          <div style={{ background:S.white, borderRadius:10, padding:24, textAlign:"center", border:`1px solid ${S.border}`, animation:"fadeUp 0.4s ease" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>Aucune correspondance</div>
            <p style={{ fontSize:13, color:S.muted, lineHeight:1.6, maxWidth:320, margin:"0 auto" }}>
              Sélectionnez une marque et une motorisation pour obtenir une recommandation. Contactez votre distributeur Shell Maroc pour les cas particuliers.
            </p>
          </div>
        )}
      </div>

      <div style={{ background:S.dark, padding:"14px 20px", textAlign:"center", fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:1 }}>
        © Shell LubriGuide Maroc · Basé sur le portefeuille Shell Maroc officiel · Données indicatives
      </div>
    </div>
  );
}
