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
  "MINI":           ["Mini One/Cooper R50/R56/F55/F56","Mini Cooper S","Mini Cooper SE","Mini Cabrio R52/R57/F57","Mini Clubman R55/F54","Mini Countryman R60/F60","Mini Paceman R61"],
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
const MOTOS   = ["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Ducati","KTM","BMW Moto","Triumph","Harley-Davidson","Aprilia"];
const PL      = ["MAN Trucks","Scania","Volvo Trucks","Iveco","DAF","Mercedes Trucks","Renault Trucks"];
const PREMIUM = ["Ferrari","Lamborghini","Bentley","Rolls-Royce","Aston Martin","Maserati"];

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
// BASE DE RECOMMANDATIONS — NORMES CONSTRUCTEURS OFFICIELLES
// Priorité : modèle exact > famille > marque
// ══════════════════════════════════════════════════════════
const RECO = [

  // ── VAG : VOLKSWAGEN ─────────────────────────────────────
  { brands:["Volkswagen"], models:["Golf VIII","Golf GTI","Golf R","Passat B8","Arteon","Tiguan II","T-Roc","ID.3","ID.4","ID.5","ID.7","Polo VI","Touareg III"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme VW 508.00 obligatoire (Longlife 3) sur tous les TSI/TFSI post-2017. Viscosité 0W-30 pour les intervalles Longlife et la réduction de consommation." },

  { brands:["Volkswagen"], models:["Golf V/VI/VII","Golf GTI","Polo V","Passat B6/B7","Tiguan I","Touran","Transporter T5/T6","Caddy IV","Crafter II","Amarok"], engine:"essence", yearMin:2005, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"VW 502.00 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme VW 502.00 pour les moteurs EA111/EA113/EA888 Gen 1&2. Protection des cames et segments sur les TSI/TFSI à chaîne de distribution." },

  { brands:["Volkswagen"], models:["Golf VIII","Golf GTI","Passat B8","Arteon","Tiguan II","T-Roc","T-Cross","Caddy V","Transporter T6","Crafter II"], engine:"diesel", yearMin:2016, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme VW 507.00 impérative pour les TDI Euro 5/6 avec FAP. Formule Low-SAPS pour ne pas colmater le filtre à particules DPF Volkswagen." },

  { brands:["Volkswagen"], models:["Golf IV/V/VI/VII","Passat B5/B6/B7","Touareg I/II","Transporter T5","Caddy IV"], engine:"diesel", yearMin:1998, yearMax:2015,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"VW 505.01 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme VW 505.01 pour les TDI à injection pompe-injecteur (PD). Résistance au cisaillement élevée indispensable pour les paliers de bielles de ces moteurs." },

  // ── VAG : AUDI ────────────────────────────────────────────
  { brands:["Audi"], models:["A3 8Y","A4 B9","A5 F5","A6 C8","A7 2018","A8 D5","Q3 F3","Q4 e-tron","Q5 FY","Q7 4M","Q8","RS3","RS4","RS5","RS6","S3","S4","S5","S6","e-tron GT"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 / 504.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Specification VW 508.00/504.00 pour les moteurs TFSI EA888 Gen 4 et V6 TFSI Audi. Indispensable pour les intervalles Audi Longlife Service et la protection des turbos haute pression." },

  { brands:["Audi"], models:["A3 8P/8V","A4 B6/B7/B8","A5 8T","A6 C6/C7","A7 2011","A8 D4","Q3 8U","Q5 8R","Q7 4L","TT 8J/8S","R8","RS4","RS6","S4"], engine:"essence", yearMin:2003, yearMax:2016,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"VW 502.00 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme VW 502.00 pour les moteurs TFSI/FSI de l'ancienne génération Audi. Protection des injecteurs direct (FSI) et des cames DOHC à forte pression d'alimentation." },

  { brands:["Audi"], models:["A3 8V","A4 B8/B9","A6 C7/C8","Q5 FY","Q7 4M","Q8"], engine:"diesel", yearMin:2015, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme VW 507.00 pour les TDI Audi Euro 6 avec SCR et FAP. Protection du système de post-traitement des émissions et des injecteurs piezoélectriques haute pression." },

  { brands:["Audi"], models:["A4 B6/B7","A6 C6","Q7 4L","TT 8J"], engine:"diesel", yearMin:2000, yearMax:2014,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"VW 505.01 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme VW 505.01 pour les TDI Audi à injection pompe-injecteur (PD). Viscosité 5W-40 maintenant l'épaisseur de film dans les paliers soumis à très haute pression." },

  // ── VAG : SEAT / CUPRA / SKODA ────────────────────────────
  { brands:["SEAT","Cupra","Škoda"], models:["Leon IV","Cupra Leon","Cupra Formentor","Cupra Born","Terramar","Octavia IV","Superb III","Kodiaq","Karoq","Kamiq","Enyaq","Scala","Arona","Ibiza V","Ateca","Tarraco"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"VW 508.00 · ACEA C2 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme VW 508.00 pour les moteurs EA211 evo et EA888 Gen 4 des marques SEAT/Cupra/Škoda. Viscosité 0W-30 pour les services Longlife et la réduction de consommation exigée par le groupe VAG." },

  { brands:["SEAT","Cupra","Škoda"], models:["Leon IV","Cupra Leon","Cupra Formentor","Octavia IV","Superb III","Kodiaq","Karoq","Ateca","Tarraco"], engine:"diesel", yearMin:2016, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"VW 507.00 · ACEA C3 · API CF", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme VW 507.00 obligatoire pour les TDI Euro 6 SEAT/Cupra/Škoda. Low-SAPS pour protéger les filtres à particules DPF de ces moteurs." },

  // ── BMW / MINI ────────────────────────────────────────────
  { brands:["BMW"], models:["Série 3 G20","Série 4 G22","Série 5 G30","Série 7 G11","X1 U11","X3 G01","X4 G02","X5 G05","X6 G06","X7","i4","i5","i7","iX","iX1","iX3","M3","M4","M5"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra 0W-30", viscosité:"0W-30",
    normes:"BMW LL-17 FE+ · ACEA C5 · API SN PLUS", vidange:"30 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Approbation BMW Longlife-17 FE+ (norme la plus récente BMW) pour les moteurs B48/B58/S58 de dernière génération. Viscosité 0W-30 imposée par BMW pour les intervalles Longlife et les économies de carburant maximales." },

  { brands:["BMW","MINI"], models:["Série 1 F20","Série 2 F22","Série 3 F30","Série 5 F10","X1 F48","X3 F25","X5 F15","Mini One/Cooper R56/F55/F56","Mini Cooper S","Mini Countryman F60","Mini Clubman F54"], engine:"essence", yearMin:2011, yearMax:2018,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"BMW LL-01 · ACEA A3/B4 · API SN", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Approbation BMW Longlife-01 pour les moteurs N20/N55/N57 de la génération F. Stabilité thermique indispensable pour les grandes capacités de vidange demandées par BMW." },

  { brands:["BMW"], models:["Série 3 E90/E92","Série 5 E60","X3 E83","X5 E70","Z4 E89","M3 E92"], engine:"essence", yearMin:2004, yearMax:2012,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"BMW LL-01 · ACEA A3/B4 · API SN", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"BMW Longlife-01 pour les moteurs N46/N52/S65 de la série E. Excellente résistance à l'oxydation pour les circuits de lubrification des moteurs BMW à haute température de fonctionnement." },

  { brands:["BMW","MINI"], models:["Série 3 G20","Série 5 G30","X3 G01","X5 G05","Mini Cooper D F56"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"BMW LL-04 · ACEA C3 · API CF", vidange:"25 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"BMW LL-04 pour les diesel B47/B57 Euro 6d avec AdBlue et FAP. Formule Low-SAPS indispensable pour ne pas détruire le FAP et le catalyseur SCR des diesel BMW récents." },

  // ── MERCEDES-BENZ ─────────────────────────────────────────
  { brands:["Mercedes-Benz"], models:["Classe A W177","Classe B W247","Classe C W206","Classe E W213","Classe S W223","CLA C118","CLS C257","EQA","EQB","EQC","EQE","EQS","GLA H247","GLB","GLC X254","GLE V167","GLS X167","AMG GT II"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"MB 229.71 · ACEA C5 · API SP", vidange:"25 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme MB 229.71 (dernière génération Mercedes 2018+) pour les moteurs M264/M256. Viscosité 0W-20 obligatoire pour respecter les intervalles d'entretien flexible Mercedes et réduire la consommation de CO₂." },

  { brands:["Mercedes-Benz"], models:["Classe C W205","Classe E W212","Classe S W222","CLA C117","GLC X253","GLE W166","Vito W447","Sprinter W907","Citan"], engine:"essence", yearMin:2013, yearMax:2017,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"MB 229.5 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme MB 229.5 pour les moteurs M270/M274 de la génération W205/W212. Protection robuste des moteurs Mercedes à allumage direct (CGI) contre les dépôts sur soupapes d'admission." },

  { brands:["Mercedes-Benz"], models:["Classe C W206","Classe E W213","GLE V167","GLS X167","Sprinter W907"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"MB 229.52 · ACEA C3 · API CF", vidange:"25 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Norme MB 229.52 pour les diesel OM654/OM656 avec BlueTEC SCR et FAP. Formule Low-SAPS nécessaire pour ne pas empoisonner le catalyseur SCR et le FAP des moteurs diesel Mercedes récents." },

  { brands:["Mercedes-Benz"], models:["Classe C W204/W205","Classe E W211/W212","Classe ML W164","Vito W639"], engine:"diesel", yearMin:2004, yearMax:2017,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"MB 229.5 · ACEA B4 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme MB 229.5 pour les diesel CDI OM651/OM642 de génération précédente. Protection des injecteurs common rail Bosch et du turbocompresseur à géométrie variable des moteurs CDI Mercedes." },

  // ── RENAULT / DACIA ────────────────────────────────────────
  { brands:["Renault","Dacia"], models:["Clio V","Clio E-Tech","Mégane V","Mégane E-Tech","Captur II","Austral","Arkana","Espace VI","Koleos II","Kangoo III","Trafic III","Master IV"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-20", viscosité:"0W-20",
    normes:"Renault RN 0700 · ACEA C2 · API SN PLUS", vidange:"20 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Renault RN 0700 pour les moteurs TCe 90/130/160 Gen2 et E-Tech hybrides. Viscosité 0W-20 requise par Renault pour les intervalles d'entretien variables et l'efficacité des hybrides E-Tech." },

  { brands:["Renault","Dacia"], models:["Clio IV","Mégane IV","Captur I","Kadjar","Koleos I","Trafic III","Master III","Kangoo II","Duster II","Sandero III","Logan III","Jogger"], engine:"essence", yearMin:2012, yearMax:2018,
    produit:"Shell Helix HX7 5W-40", viscosité:"5W-40",
    normes:"Renault RN 0700 · ACEA A3/B4 · API SN", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Renault RN 0700 pour les moteurs TCe 115/130/150 et Energy TCe ancienne génération. Protection des arbres à cames et des turbocompresseurs des moteurs TCe à faible cylindrée." },

  { brands:["Renault","Dacia"], models:["Clio V","Mégane V","Captur II","Austral","Kangoo III","Trafic III","Master IV"], engine:"diesel", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Renault RN 0720 · ACEA C3 · API CF", vidange:"20 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Renault RN 0720 pour les diesel Blue dCi 115/150 avec FAP et SCR AdBlue. Low-SAPS pour protéger le FAP et le catalyseur SCR des moteurs diesel Renault Euro 6d." },

  { brands:["Renault","Dacia"], models:["Clio IV","Mégane IV","Captur I","Kadjar","Trafic III","Master III","Kangoo II","Duster I/II","Sandero II","Logan II"], engine:"diesel", yearMin:2010, yearMax:2018,
    produit:"Shell Helix HX7 AV 5W-30", viscosité:"5W-30",
    normes:"Renault RN 0710 · ACEA B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Renault RN 0710 pour les diesel dCi K9K/R9M ancienne génération. Protection des injecteurs piezo et du turbocompresseur VNT des moteurs dCi Renault." },

  // ── PEUGEOT / CITROËN / DS (groupe PSA / Stellantis) ─────
  { brands:["Peugeot","Citroën","DS Automobiles"], models:["208 II","308 III","408","508 II","2008 II","3008 II","5008 II","Rifter","Partner III","Expert III","C3 III","C4 III","C5 Aircross","C5 X","DS 3 Crossback","DS 4","DS 7 Crossback","DS 9"], engine:"essence", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"PSA B71 2312 · ACEA C2 · API SN", vidange:"20 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme PSA B71 2312 pour les moteurs PureTech 100/130/155/180 et Hybrid 225/300. Viscosité C2 Low-SAPS obligatoire pour protéger les systèmes de post-traitement des PureTech à très forte sollicitation." },

  { brands:["Peugeot","Citroën","DS Automobiles"], models:["208 I","308 II","508 I","2008 I","3008 I","5008 I","C3 II","C4 I/II","C4 Picasso II","C5 II","Berlingo II","DS 3","DS 4","DS 5"], engine:"essence", yearMin:2010, yearMax:2018,
    produit:"Shell Helix HX7 5W-40", viscosité:"5W-40",
    normes:"PSA B71 2296 · ACEA A3/B4 · API SN", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme PSA B71 2296 pour les moteurs EP6/EP8 et THP ancienne génération. Protection des arbres à cames VVT-i et des guides de soupapes des moteurs Prince PSA." },

  { brands:["Peugeot","Citroën","DS Automobiles"], models:["208 II","308 III","508 II","2008 II","3008 II","5008 II","C3 III","C4 III","C5 Aircross","DS 7","Berlingo III","Partner III","Expert III","Boxer"], engine:"diesel", yearMin:2019, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"PSA B71 2290 / B71 2312 · ACEA C3 · API CF", vidange:"20 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme PSA Stellantis pour les diesel BlueHDi DV5/DW10 avec FAP et SCR. Low-SAPS impératif pour ne pas détruire le filtre à particules des diesel PSA Euro 6d." },

  { brands:["Peugeot","Citroën","DS Automobiles"], models:["208 I","308 I/II","508 I","2008 I","3008 I","C3 II","C4 I/II","C5 I/II","Berlingo II","Partner II"], engine:"diesel", yearMin:2005, yearMax:2018,
    produit:"Shell Helix HX7 AV 5W-30", viscosité:"5W-30",
    normes:"PSA B71 2290 · ACEA B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme PSA B71 2290 pour les diesel HDi DV6C/DW10 ancienne génération. Protection des injecteurs common rail Delphi et Siemens et du turbocompresseur VVT des moteurs HDi." },

  // ── FIAT / ALFA / LANCIA (Stellantis) ─────────────────────
  { brands:["Fiat","Alfa Romeo","Lancia"], models:["500 312","500X 334","500L 330","Panda III","Tipo 356","Doblo II","Giulietta 940","Giulia 952","Stelvio 949","Tonale","Ypsilon 846"], engine:"essence", yearMin:2014, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"Fiat 9.55535-GS1 · PSA B71 2312 · ACEA C2", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Fiat 9.55535-GS1 pour les moteurs FireFly 1.0/1.2/1.4 Turbo et JTDM récents. Viscosité C2 Low-SAPS pour protéger les systèmes GPF/FAP des moteurs Stellantis." },

  { brands:["Fiat","Alfa Romeo","Lancia"], models:["500 312","Panda III","Tipo 356","Doblo II","Ducato III","Giulietta 940","Giulia 952","Stelvio 949"], engine:"diesel", yearMin:2012, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Fiat 9.55535-S3 · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Fiat 9.55535-S3 pour les diesel MultiJet II et JTDm avec FAP. Low-SAPS pour protéger le filtre à particules et le système SCR des diesel Stellantis Euro 6." },

  // ── OPEL / VAUXHALL ───────────────────────────────────────
  { brands:["Opel / Vauxhall"], models:["Astra L","Crossland X","Grandland X","Mokka B","Mokka-e","Zafira C","Vivaro C","Movano B"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-30", viscosité:"0W-30",
    normes:"PSA B71 2312 / GM LL-B-025 · ACEA C2 · API SN", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme PSA/GM pour les moteurs PureTech des Opel du groupe Stellantis. Même spécification C2 que les moteurs Peugeot/Citroën de la même famille." },

  { brands:["Opel / Vauxhall"], models:["Astra H/J/K","Corsa D/E","Insignia A/B","Mokka A","Zafira B"], engine:"essence", yearMin:2005, yearMax:2017,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"GM LL-B-025 · ACEA A3/B4 · API SN", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme GM Dexos2 / LL-B-025 pour les moteurs Z16XER/A16XER/A18XER et SIDI Opel. Protection des VVT et des chaînes de distribution des moteurs Opel." },

  { brands:["Opel / Vauxhall"], models:["Astra K/L","Insignia B","Grandland X","Vivaro C","Movano B"], engine:"diesel", yearMin:2015, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"PSA B71 2290 / GM Dexos2 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme PSA/GM Dexos2 pour les diesel CDTi avec FAP des Opel. Low-SAPS pour protéger les systèmes de dépollution des moteurs diesel Opel Euro 5/6." },

  // ── TOYOTA / LEXUS ────────────────────────────────────────
  { brands:["Toyota"], models:["Yaris IV/XP210","Yaris Cross","Yaris GR","Corolla E210","Corolla Cross","Prius XW60","Prius PHV","RAV4 XA50","RAV4 PHEV","C-HR NGX50 II","Aygo X","bZ4X","GR86 II","GR Supra"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Toyota 08880-80376 / 0W20 GF-6A · ACEA A1/B1 · API SP ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Shell CVT Fluid (boîte CVT Toyota)",
    raison:"Viscosité 0W-20 officiellement spécifiée par Toyota pour les moteurs Dynamic Force M20A/M15A-FXE et hybrides THS-II. Obligatoire pour les intervalles garantis Toyota et les hybrides série XW60." },

  { brands:["Toyota","Lexus"], models:["Yaris GR","GR86 II","GR Supra DB","RC F FSB","LS F40/F50","GS GRL10"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra Racing 10W-60", viscosité:"10W-60",
    normes:"Toyota Gazoo Racing · ACEA A3/B4 · API SN", vidange:"8 000 – 10 000 km",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Huile haute performance recommandée pour les moteurs GR Sport et circuit. Protection optimale à très haute température pour les moteurs sportifs Toyota Gazoo Racing." },

  { brands:["Toyota"], models:["Auris E150/E180","Corolla E140","Prius XW20/XW30","Avensis T25/T27","RAV4 XA30/XA40","Yaris XP90/XP130","Verso","Proace II","HiAce","Hilux VIII"], engine:"essence", yearMin:2006, yearMax:2017,
    produit:"Shell Helix HX7 5W-30", viscosité:"5W-30",
    normes:"Toyota 08880-80830 / ILSAC GF-4 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Recommandation Toyota pour les moteurs 1NR-FE/2NR-FE/2ZR-FE de génération précédente. Protection des systèmes VVT-i et VVT-iE dans les conditions climatiques variées." },

  { brands:["Toyota"], models:["Prius XW20/XW30/XW50/XW60","Yaris Cross","Corolla XP210","RAV4 PHEV","Auris hybride","C-HR hybride"], engine:"hybride", yearMin:2008, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Toyota 08880-80376 · API SN PLUS · ILSAC GF-5 · ACEA A1/B1", vidange:"15 000 km",
    complement:"Shell CVT Fluid",
    raison:"Huile officielle Toyota pour tous les hybrides THS-II et THS-III. La viscosité 0W-20 ultra-légère est impérative pour minimiser les pertes mécaniques lors des multiples transitions moteur thermique/électrique." },

  { brands:["Toyota","Lexus"], models:["Avensis T27","Corolla E140/E150","RAV4 XA30/XA40","Land Cruiser J200","Hilux VIII","Proace II"], engine:"diesel", yearMin:2008, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Toyota 08880-80830 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Recommandation Toyota pour les diesel D-4D 2.0/2.2 avec FAP. Protection des injecteurs common rail haute pression Denso et du turbocompresseur VGT des diesels Toyota." },

  { brands:["Lexus"], models:["CT 200h ZWA10","UX 250h ZA10","ES XV70","NX AZ20","RX XU50","UX 300e","RZ 450e"], engine:"hybride", yearMin:2010, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Toyota 08880-80376 · ILSAC GF-6A · API SP · ACEA A1/B1", vidange:"15 000 km",
    complement:"Shell CVT Fluid",
    raison:"Spécification Lexus (groupe Toyota) pour tous les hybrides multi-étapes. La viscosité 0W-20 est obligatoire pour le fonctionnement du système hybride Lexus et les intervalles d'entretien premium." },

  // ── HONDA ─────────────────────────────────────────────────
  { brands:["Honda"], models:["Civic FL","CR-V RW","HR-V RV","Jazz GR","Jazz e:HEV"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Honda 08221-99974 · API SN PLUS · ILSAC GF-5/GF-6A", vidange:"12 000 km ou 1 an",
    complement:"Shell CVT Fluid Honda CVT",
    raison:"Viscosité 0W-20 requise par Honda pour les moteurs VTEC Turbo L15B7/L13B et hybrides i-MMD. Indispensable pour respecter les intervalles de maintenance Honda et le fonctionnement des hybrides e:HEV." },

  { brands:["Honda"], models:["Civic FK2/FK8","Civic Type R","Accord CR","CR-V RM","Jazz GK","NSX NC1"], engine:"essence", yearMin:2012, yearMax:2017,
    produit:"Shell Helix HX7 5W-30", viscosité:"5W-30",
    normes:"Honda HTO-06 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Honda HTO-06 pour les moteurs VTEC R20A/K20C/K24A de génération précédente. Protection des arbres à cames DOHC VTEC à passages d'huile haute pression." },

  // ── FORD ─────────────────────────────────────────────────
  { brands:["Ford"], models:["Puma MK2","Kuga MK3","Focus MK4","Fiesta MK8","Mondeo MK5","Galaxy MK3","S-Max MK2","Transit Custom MK2","Transit MK8","Ranger T7"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C2 0W-20", viscosité:"0W-20",
    normes:"Ford WSS-M2C947-B1 · API SN PLUS · ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Ford WSS-M2C947-B1 pour les EcoBoost 1.0/1.5/2.0 de dernière génération. Viscosité 0W-20 requise par Ford pour les systèmes de gestion thermique et la réduction de CO₂." },

  { brands:["Ford"], models:["Focus MK2/MK3","Fiesta MK6/MK7","Mondeo MK4","Kuga MK1/MK2","Transit Custom MK1","Transit MK7","Galaxy MK2","S-Max MK1"], engine:"essence", yearMin:2005, yearMax:2017,
    produit:"Shell Helix HX7 5W-20", viscosité:"5W-20",
    normes:"Ford WSS-M2C913-D · API SN · ACEA A1/B1", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Ford WSS-M2C913-D pour les moteurs Duratec/EcoBoost ancienne génération. Viscosité 5W-20 recommandée par Ford Europe pour les conditions normales d'utilisation." },

  { brands:["Ford"], models:["Kuga MK3","Focus MK4","Transit Custom MK2","Transit MK8","Ranger T7"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Ford WSS-M2C917-A · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Ford WSS-M2C917-A pour les EcoBlue 1.5/2.0 TDCi Euro 6 avec FAP. Low-SAPS pour protéger les systèmes SCR AdBlue et FAP des diesel Ford." },

  { brands:["Ford"], models:["Focus MK2/MK3","Mondeo MK4","Kuga MK1/MK2","Transit Custom MK1","Transit MK7"], engine:"diesel", yearMin:2005, yearMax:2017,
    produit:"Shell Helix HX7 AV 5W-30", viscosité:"5W-30",
    normes:"Ford WSS-M2C913-D · ACEA B3/B4 · API CF", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Ford WSS-M2C913-D pour les diesel TDCi Duratorq ancienne génération. Protection des injecteurs Delphi/Bosch et du turbocompresseur VGT des moteurs diesel Ford." },

  // ── VOLVO ─────────────────────────────────────────────────
  { brands:["Volvo"], models:["XC40 Recharge","C40","XC60 II","XC90 II","S60 III","S90 II","V60 II","V60 CC II","V90 II","V90 CC II","EX30","EX90"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Volvo VCC-RBS2AE · ACEA A1/B1 · API SN PLUS", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Volvo VCC-RBS2AE pour les moteurs Drive-E B3/B4/T5/T6 de dernière génération. La viscosité 0W-20 est obligatoire pour les intervalles d'entretien variable Volvo et les hybrides Recharge." },

  { brands:["Volvo"], models:["XC40","XC60 I","XC70 II","XC90 I","S40 II","S60 II","S80 II","V40 II","V50","V60 I","V70 III"], engine:"essence", yearMin:2007, yearMax:2017,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"Volvo VCC-RBS2AE · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Norme Volvo VCC-RBS2AE pour les moteurs B4164T/B4204T/B5254T ancienne génération. Excellente protection des turbocompresseurs et des VVT des moteurs Volvo à allumage par étincelle." },

  { brands:["Volvo"], models:["XC60 II","XC90 II","V60 II","V90 II","S60 III","S90 II"], engine:"diesel", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Volvo VCC-RBS2AJ · ACEA C3 · API CF", vidange:"20 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Volvo VCC-RBS2AJ pour les diesel D2/D3/D4/D5 Drive-E Euro 6 avec SCR/AdBlue. Protection du système de post-traitement et des injecteurs Common Rail haute pression." },

  // ── HYUNDAI / KIA / GENESIS ───────────────────────────────
  { brands:["Hyundai","Kia","Genesis"], models:["Tucson NX4","Santa Fe MX5","Kona OS EV","Ioniq 5 NE","Ioniq 6 CE","Ioniq AE","EV6 CV","EV9 MV","GV60","GV70 JK1","GV80 JX1","i20 BC3","i30 CN7","Ceed CD II","Sportage NQ5","Sorento MQ4","Carnival KA4","Stinger CK"], engine:"essence", yearMin:2020, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Hyundai 04E00-00020 · API SP · ILSAC GF-6A · ACEA A1/B1", vidange:"15 000 km ou 1 an",
    complement:"Shell CVT Fluid",
    raison:"Viscosité 0W-20 recommandée par Hyundai/Kia pour les moteurs Smartstream T-GDI Nu/Theta III. Obligatoire pour les hybrides Hyundai TMED et les systèmes Stop & Start à démarrage fréquent." },

  { brands:["Hyundai","Kia","Genesis"], models:["Tucson TL","Santa Fe TM","Kona OS","i30 PD","Ceed JD/CD","Sportage QL/QE","Sorento UM","Niro DE"], engine:"essence", yearMin:2014, yearMax:2019,
    produit:"Shell Helix HX7 5W-30", viscosité:"5W-30",
    normes:"Hyundai 04E00-00030 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Recommandation Hyundai/Kia pour les moteurs Gamma/Nu II de génération précédente. Protection des chaînes de distribution et des arbres à cames double des moteurs GDI coréens." },

  { brands:["Hyundai","Kia","Genesis"], models:["Tucson NX4","Santa Fe MX5","Sportage NQ5","Sorento MQ4","Staria","i20 N","i30 N"], engine:"diesel", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Hyundai 04E00-00010 · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Hyundai/Kia pour les diesel CRDi R2.0 Euro 6 avec FAP et SCR. Protection du système d'injection haute pression (2 000 bar) et du catalyseur SCR urea des diesel coréens." },

  // ── NISSAN / INFINITI ─────────────────────────────────────
  { brands:["Nissan","Infiniti"], models:["Qashqai J12","X-Trail T33","Leaf ZE1","Juke F16","Ariya","Micra K14"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Nissan 999MP-5W20P3 · API SN PLUS · ILSAC GF-6A", vidange:"15 000 km ou 1 an",
    complement:"Shell CVT Fluid NS-3",
    raison:"Viscosité 0W-20 recommandée par Nissan pour les moteurs HR13DDT et HR15DE récents. Optimise l'efficacité des boîtes CVT Xtronic et réduit la consommation des moteurs Renault-Nissan Alliance." },

  { brands:["Nissan","Infiniti"], models:["GT-R R35","370Z Z34","Qashqai J10/J11","X-Trail T31/T32","Micra K13","Navara D23"], engine:"essence", yearMin:2007, yearMax:2016,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"Nissan 999MP-5W30P2 · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Shell CVT Fluid NS-2",
    raison:"Spécification Nissan pour les moteurs MR18DE/HR16DE/VR38DETT de génération précédente. Protection des systèmes CVTC (distribution variable continue) des moteurs Nissan." },

  { brands:["Nissan","Infiniti"], models:["Qashqai J11/J12","X-Trail T32/T33","Navara D23"], engine:"diesel", yearMin:2014, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"Nissan 999MP-CF5W30-REN · ACEA C3 · API CF", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Recommandation Nissan pour les diesel dCi 1.5/1.6/2.0 Euro 5/6. Protection des injecteurs Siemens/Delphi haute pression et du FAP des diesel Nissan-Renault." },

  // ── MAZDA ─────────────────────────────────────────────────
  { brands:["Mazda"], models:["Mazda3 BP","Mazda6 GL","CX-30 DM","CX-5 KF","CX-60 KH","MX-30 DR"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"Mazda 0W-20 SP · API SP · ILSAC GF-6A · ACEA A1/B1", vidange:"15 000 km ou 1 an",
    complement:"Shell CVT Fluid",
    raison:"Viscosité 0W-20 obligatoire pour les moteurs SKYACTIV-G et SKYACTIV-X (HCCI). Le moteur SKYACTIV-X à allumage par compression exige impérativement cette viscosité pour son cycle thermodynamique innovant." },

  { brands:["Mazda"], models:["Mazda2 DJ","Mazda3 BL/BM","Mazda6 GH/GJ","CX-3 DK","CX-5 KE","MX-5 NC/ND"], engine:"essence", yearMin:2010, yearMax:2017,
    produit:"Shell Helix HX7 5W-30", viscosité:"5W-30",
    normes:"Mazda 5W-30 SN · API SN · ACEA A3/B4", vidange:"10 000 km ou 1 an",
    complement:"Shell Spirax S4 G 75W-90",
    raison:"Recommandation Mazda pour les moteurs SKYACTIV-G 1.3/1.5/2.0/2.5 ancienne génération. Protection des parois de cylindres à faible friction SKYACTIV." },

  // ── SUBARU ────────────────────────────────────────────────
  { brands:["Subaru"], models:["Impreza GT","WRX VA","WRX STI VAB","BRZ ZD8","Forester SK","XV GT","Outback BT","Legacy BS"], engine:"essence", yearMin:2014, yearMax:2099,
    produit:"Shell Helix Ultra 5W-30", viscosité:"5W-30",
    normes:"Subaru SOA427V1410 / API SN · ACEA A3/B4", vidange:"12 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Subaru pour les moteurs boxer FB20/FB25/FA24 à plat. La viscosité 5W-30 est impérative dans les moteurs boxer horizontaux : l'huile doit lubrifier des axes perpendiculaires à la gravité." },

  // ── PORSCHE ───────────────────────────────────────────────
  { brands:["Porsche"], models:["911 992","Cayenne 9YA","Macan MK2","Panamera 971","Taycan"], engine:"essence", yearMin:2018, yearMax:2099,
    produit:"Shell Helix Ultra 0W-40 PurePlus", viscosité:"0W-40",
    normes:"Porsche C20 · ACEA A3/B4 · API SN PLUS", vidange:"20 000 km ou 2 ans",
    complement:"Shell Spirax S6 GXME 75W-80 (PDK)",
    raison:"Approbation officielle Porsche C20 pour les moteurs EA839 Turbo et moteurs 911 flat-6. L'huile PurePlus (synthèse à partir de gaz naturel) garantit une pureté et une stabilité inégalées pour les moteurs Porsche haute performance." },

  { brands:["Porsche"], models:["911 991/997","Cayenne 92A","Boxster 981/718","Cayman 981/718","Macan 95B","Panamera 970"], engine:"essence", yearMin:2004, yearMax:2017,
    produit:"Shell Helix Ultra 5W-40", viscosité:"5W-40",
    normes:"Porsche A40 · ACEA A3/B4 · API SN", vidange:"15 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme Porsche A40 pour les moteurs MA1.01/MA1.01x flat-6 et V8. Viscosité 5W-40 recommandée par Porsche pour les hautes températures de fonctionnement de ces moteurs à refroidissement air/eau." },

  // ── LAND ROVER / JAGUAR ───────────────────────────────────
  { brands:["Land Rover"], models:["Defender L663","Discovery 5","Discovery Sport L550","Range Rover L405","Range Rover Sport L494","Range Rover Evoque L551","Range Rover Velar"], engine:"essence", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"JLR STJLR.51.5122 · ACEA C5 · API SP", vidange:"21 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Spécification officielle JLR STJLR.51.5122 pour les moteurs Ingenium AJ200/AJ300 turbo. La viscosité 0W-20 est obligatoire pour respecter les intervalles de service étendu Land Rover et minimiser la consommation." },

  { brands:["Jaguar"], models:["F-Pace X761","E-Pace X540","XE X760","XF X260","F-Type X152"], engine:"essence", yearMin:2016, yearMax:2099,
    produit:"Shell Helix Ultra 0W-20", viscosité:"0W-20",
    normes:"JLR STJLR.51.5122 · ACEA C5 · API SP", vidange:"21 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme JLR commune pour tous les moteurs Ingenium Jaguar. La viscosité 0W-20 ACEA C5 assure la protection maximum des moteurs turbo Jaguar tout en respectant les objectifs CO₂ constructeur." },

  { brands:["Land Rover","Jaguar"], models:["Defender L663","Discovery 5","Range Rover L405","Range Rover Sport L494","XF X260","XE X760"], engine:"diesel", yearMin:2017, yearMax:2099,
    produit:"Shell Helix Ultra ECT C3 5W-30", viscosité:"5W-30",
    normes:"JLR STJLR.51.5006 · ACEA C3 · API CF", vidange:"21 000 km ou 1 an",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Norme JLR STJLR.51.5006 pour les diesel Ingenium 2.0d/3.0d AJ200D/AJ300D avec FAP et SCR. Protection des injecteurs piezoélectriques haute pression et du FAP des moteurs diesel JLR." },

  // ── FERRARI / LAMBORGHINI / MASERATI / BENTLEY / ROLLS / ASTON ─
  { brands:["Ferrari","Lamborghini","Maserati","Bentley","Rolls-Royce","Aston Martin"], models:[], engine:"essence", yearMin:1995, yearMax:2099,
    produit:"Shell Helix Ultra 0W-40 PurePlus", viscosité:"0W-40",
    normes:"Ferrari official partner · ACEA A3/B4 · API SN PLUS", vidange:"10 000 – 15 000 km",
    complement:"Shell Spirax S6 GXME 75W-80",
    raison:"Huile officielle Shell développée avec la Scuderia Ferrari, utilisée en Formule 1. Technologie PurePlus (synthèse gaz naturel) garantissant la pureté maximale pour les moteurs V8/V10/V12 de supercars. Approuvée pour Ferrari, Lamborghini, Bentley, Rolls-Royce et Aston Martin." },

  // ── TESLA / ÉLECTRIQUES ───────────────────────────────────
  { brands:["Tesla","Polestar","Rivian","BYD","MG"], models:[], engine:"électrique", yearMin:2012, yearMax:2099,
    produit:"Shell Transmission Fluid EV", viscosité:"N/A",
    normes:"Tesla Drive Unit approval · ACEA · Polestar qualified", vidange:"100 000 km",
    complement:"Shell Brake Fluid DOT 4+ (frein régénératif)",
    raison:"Fluide dédié aux groupes motopropulseurs électriques. Refroidissement et lubrification des réducteurs monovitesse EV. Compatibilité avec les rotors cuivre des moteurs électriques et les onduleurs silicium carbure." },

  // ── POIDS LOURDS ──────────────────────────────────────────
  { brands:["MAN Trucks"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R6 LME 10W-40", viscosité:"10W-40",
    normes:"MAN M3477 · ACEA E6/E9 · API CK-4", vidange:"120 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90 (pont MAN HY)",
    raison:"Approbation MAN M3477 pour les moteurs D20/D26/D38 Euro 6. Low-SAPS pour le FAP MAN, réduction de la consommation d'huile et protection des pistons PTWA en usage longue distance." },

  { brands:["Scania"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R6 ME 5W-30", viscosité:"5W-30",
    normes:"Scania LDF-3 · ACEA E6/E9 · API CK-4", vidange:"150 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Approbation Scania LDF-3 (Longlife Drain) pour les moteurs DC09/DC13/DC16 Euro 6. Économies de carburant 0,5% et intervalles de vidange records pour les flottes Scania." },

  { brands:["Volvo Trucks"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R6 M 10W-40", viscosité:"10W-40",
    normes:"Volvo VDS-4.5 · ACEA E7/E9 · API CK-4", vidange:"100 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Norme Volvo VDS-4.5 pour les moteurs D11/D13/D16 Euro 6. Protection maximale contre l'usure des pistons et du turbo dans les applications de transport longue distance Volvo." },

  { brands:["DAF"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R6 LME 10W-40", viscosité:"10W-40",
    normes:"DAF Extended Drain · ACEA E6/E9 · API CK-4", vidange:"120 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Approuvé pour les moteurs MX-11 et MX-13 DAF Euro 6. Compatible avec les systèmes EAS (FAP + SCR + DOC) DAF. Vidanges prolongées réduisant les coûts d'exploitation des flottes." },

  { brands:["Iveco"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R4 X 15W-40", viscosité:"15W-40",
    normes:"Iveco TLS 2-35975-2 · ACEA E7 · API CI-4+", vidange:"80 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Norme Iveco TLS pour les Cursor 9/11/13 Euro 5/6. Protection contre les dépôts sur pistons et maintien de la viscosité dans les moteurs Iveco à haute densité de puissance." },

  { brands:["Mercedes Trucks","Renault Trucks"], models:[], engine:"diesel", yearMin:2005, yearMax:2099,
    produit:"Shell Rimula R6 M 10W-40", viscosité:"10W-40",
    normes:"MB 228.51 · ACEA E7/E9 · API CK-4 · Renault VI RLD-3", vidange:"100 000 km ou 1 an",
    complement:"Shell Spirax S6 AXME 75W-90",
    raison:"Double approbation Mercedes Trucks MB 228.51 et Renault Trucks RLD-3. Idéale pour les parcs mixtes Actros/T. Intervalles longue distance pour réduire les coûts d'exploitation." },

  // ── MOTOS ─────────────────────────────────────────────────
  { brands:["Honda Moto","Yamaha Moto","Kawasaki","Suzuki Moto","Aprilia"], models:[], engine:"essence", yearMin:1990, yearMax:2099,
    produit:"Shell Advance Ultra 4T 10W-40", viscosité:"10W-40",
    normes:"JASO MA2 · API SN · Honda HP4M · Yamaha LM TW", vidange:"6 000 – 8 000 km",
    complement:"Shell Advance Gear 80W-90",
    raison:"Certifiée JASO MA2 avec approbations officielles Honda et Yamaha. Protège simultanément moteur, embrayage humide et boîte de vitesses intégrée. Technologie PurePlus pour une propreté maximale." },

  { brands:["BMW Moto"], models:["R 1250 GS Adv","R 1250 R/RS","R nineT Urban G/S","F 850 GS Adv","F 900 R/XR","S 1000 RR M","S 1000 XR","M 1000 RR"], engine:"essence", yearMin:2014, yearMax:2099,
    produit:"Shell Advance Ultra 4T 15W-50", viscosité:"15W-50",
    normes:"BMW Motorrad GS recommendation · JASO MA2 · API SN", vidange:"10 000 km ou 1 an",
    complement:"Shell Advance Gear 80W-90",
    raison:"Viscosité 15W-50 recommandée par BMW Motorrad pour les twins boxer R1250 et S1000. Résistance thermique supérieure pour les moteurs BMW Moto à refroidissement mixte huile/air/eau fonctionnant à hautes températures." },

  { brands:["Ducati","KTM"], models:["Panigale V4 R","Multistrada V4 S","Streetfighter V4 S","Duke 1290 Super","Adventure 1290 S","Super Duke R 1290"], engine:"essence", yearMin:2012, yearMax:2099,
    produit:"Shell Advance Ultra 4T 10W-50", viscosité:"10W-50",
    normes:"Ducati TF approval · JASO MA2 · API SN", vidange:"6 000 km ou 1 an",
    complement:"Shell Advance Gear 80W-90",
    raison:"Viscosité 10W-50 approuvée Ducati pour les Desmodromic V4/L-twin. Protection optimale des culasses et des cames DESMO fonctionnant sans ressorts de rappel, à très haute température et régime." },

  { brands:["Harley-Davidson"], models:[], engine:"essence", yearMin:1995, yearMax:2099,
    produit:"Shell Advance Ultra 4T 20W-50", viscosité:"20W-50",
    normes:"Harley-Davidson SAE 20W-50 · JASO MA · API SJ/SL", vidange:"8 000 km ou 1 an",
    complement:"Shell Advance Gear 80W-90",
    raison:"Viscosité 20W-50 OBLIGATOIRE sur tous les V-Twin Harley-Davidson Milwaukee-Eight et Evolution. Cette viscosité élevée est requise par Harley pour protéger les poussoirs hydrauliques et les culasses à grande course des V-twins à fort couple." },

  { brands:["Triumph"], models:["Street Triple 765 R/RS","Tiger 900 GT","Tiger 1200 GT Pro","Speed Triple 1200 RS","Bonneville T100/T120","Trident 660","Rocket 3 GT","Thruxton RS"], engine:"essence", yearMin:2012, yearMax:2099,
    produit:"Shell Advance Ultra 4T 10W-40", viscosité:"10W-40",
    normes:"Triumph approved · JASO MA2 · API SN", vidange:"8 000 km ou 1 an",
    complement:"Shell Advance Gear 80W-90",
    raison:"Approbation Triumph pour les moteurs 3 et 4 cylindres Triumph. La viscosité 10W-40 est celle recommandée dans les carnets Triumph pour une protection optimale des moteurs inline-3 à haute température." },
];

// ══════════════════════════════════════════════════════════
// MOTEUR DE RECOMMANDATION — PRIORISE MODÈLE EXACT
// ══════════════════════════════════════════════════════════
const INDUSTRIE_DB = [
  { equipType:"pompe hydraulique", tempRange:["froid","normal"], loadType:["légère","modérée"],
    produit:"Shell Tellus S2 MX 46", viscosité:"ISO VG 46",
    normes:"ISO 11158 HM · DIN 51524-2 HLP · Denison HF-0/1/2", intervalle:"4 000 h ou 1 an",
    vigilance:"Vérifier la propreté du circuit (ISO 16/14/11). Contrôler la température de retour.",
    raison:"Huile hydraulique polyvalente pour systèmes industriels courants. Protection antioxydante renforcée et excellente séparabilité eau/huile." },
  { equipType:"pompe hydraulique", tempRange:["chaud","extrême"], loadType:["lourde","extrême"],
    produit:"Shell Tellus S4 VX 46", viscosité:"ISO VG 46",
    normes:"ISO 11158 HV · DIN 51524-3 HVLP · Vickers M2950", intervalle:"6 000 h ou 2 ans",
    vigilance:"Surveiller viscosité à chaud. Adapter filtration si contamination élevée.",
    raison:"Synthétique stable sur large plage de température. Idéale pour environnements avec fortes variations thermiques." },
  { equipType:"compresseur", tempRange:["froid","normal","chaud"], loadType:["légère","modérée"],
    produit:"Shell Corena S3 R 46", viscosité:"ISO VG 46",
    normes:"ISO 6743-3A DAA/DAB · DIN 51506 VDL", intervalle:"4 000 h",
    vigilance:"Vidanger à chaud après arrêt. Remplacer filtre séparateur simultanément.",
    raison:"Protection pour compresseurs rotatifs à vis. Réduit les dépôts et prolonge les joints." },
  { equipType:"compresseur", tempRange:["extrême"], loadType:["lourde","extrême"],
    produit:"Shell Corena S4 R 46", viscosité:"ISO VG 46",
    normes:"ISO 6743-3A DAA · Atlas Copco Roto-Xtend Fluid", intervalle:"8 000 h",
    vigilance:"Filtres certifiés obligatoires. Analyse d'huile tous les 2 000 h.",
    raison:"Synthétique haute performance pour compresseurs sous forte charge continue. Compatible Atlas Copco et Gardner Denver." },
  { equipType:"réducteur / engrenage", tempRange:["froid","normal","chaud"], loadType:["légère","modérée","lourde"],
    produit:"Shell Omala S2 GX 220", viscosité:"ISO VG 220",
    normes:"ISO 12925-1 CKC/CKD · AGMA 9005-F16 · DIN 51517-3", intervalle:"5 000 h ou 1 an",
    vigilance:"Contrôler niveau avant démarrage. Nettoyer filtre magnétique à chaque vidange.",
    raison:"Huile EP pour engrenages fermés résistant aux chocs de charge et micropitting." },
  { equipType:"réducteur / engrenage", tempRange:["extrême"], loadType:["extrême"],
    produit:"Shell Omala S4 GX 220", viscosité:"ISO VG 220",
    normes:"ISO 12925-1 CKD · Flender EXTRA · David Brown S1.53.101", intervalle:"10 000 h ou 2 ans",
    vigilance:"Ne pas mélanger avec huiles minérales. Surveiller température de carter.",
    raison:"Synthétique de pointe, réduit 40% les pertes par friction. Double les intervalles vs huile minérale." },
  { equipType:"convoyeur", tempRange:["froid","normal","chaud","extrême"], loadType:["légère","modérée","lourde","extrême"],
    produit:"Shell Gadus S3 V220C 2", viscosité:"NLGI 2",
    normes:"DIN 51825 KP2K-30 · ISO 12924", intervalle:"500 – 1 000 h selon conditions",
    vigilance:"Regraisser plus fréquemment en milieu humide ou poussiéreux. Purger avant application.",
    raison:"Graisse lithium complexe résistante à l'eau, aux vibrations et aux températures élevées." },
  { equipType:"machine-outil", tempRange:["froid","normal"], loadType:["légère","modérée"],
    produit:"Shell Morlina S2 B 68", viscosité:"ISO VG 68",
    normes:"ISO 6743-7 FD · DIN 51519 VG 68 · Cincinnati P-47", intervalle:"2 000 h ou 6 mois",
    vigilance:"Filtrer finement (< 10 µm). Maintenir niveau du bain en permanence.",
    raison:"Huile circulante pour broches et glissières. Anti-mousse et protection rouille longue durée." },
  { equipType:"turbine", tempRange:["chaud","extrême"], loadType:["modérée","lourde"],
    produit:"Shell Turbo S4 X 32", viscosité:"ISO VG 32",
    normes:"ISO 6743-5 TD/TG · GE GEK 107395 · Siemens TLV 901304", intervalle:"20 000 – 40 000 h",
    vigilance:"Surveiller TAN et oxydation. Analyses d'huile tous les 3 mois.",
    raison:"Synthétique pour turbines vapeur et gaz. Résistance à l'oxydation exceptionnelle." },
  { equipType:"groupe électrogène", tempRange:["froid","normal","chaud"], loadType:["modérée","lourde"],
    produit:"Shell Rimula R4 X 15W-40", viscosité:"15W-40",
    normes:"ACEA E7 · API CI-4 PLUS · Caterpillar ECF-2", intervalle:"500 h ou 1 an",
    vigilance:"Vérifier niveau toutes les 50 h. Respecter intervalles en usage stationnaire.",
    raison:"Huile diesel robuste pour groupes électrogènes. Protection boues basse température et usure cames." },
];

function recommend(sector, fields) {
  if (sector !== "auto") {
    const et = (fields.equipType||"").toLowerCase();
    const tr = (fields.tempRange||"").toLowerCase();
    const lt = (fields.loadType||"").toLowerCase();
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
  const e  = (engine||"").toLowerCase();
  const y  = parseInt(year) || 2020;
  const mo = (model||"").toLowerCase();

  let best = null, bestScore = -1;

  for (const r of RECO) {
    if (!r.brands.includes(brand)) continue;
    if (r.engine !== e) continue;
    if (y < r.yearMin || y > r.yearMax) continue;

    let score = 10; // base score for brand+engine+year match

    // Bonus si le modèle est explicitement listé
    if (r.models && r.models.length > 0) {
      const modelMatch = r.models.some(m => {
        const ml = m.toLowerCase();
        // exact or partial match
        return mo.includes(ml) || ml.includes(mo) ||
          mo.split(/[\s\/]/)[0] === ml.split(/[\s\/]/)[0]; // prefix match
      });
      if (modelMatch) score += 20; // forte priorité si modèle exact trouvé
      else score -= 5; // légère pénalité si modèle non listé
    } else {
      // Règle générique (marque sans liste de modèles) = score neutre
      score += 0;
    }

    // Bonus plus récent = probablement plus précis
    score += Math.min((r.yearMin - 2000) / 2, 8);

    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best;
}

// ══════════════════════════════════════════════════════════
// UI
// ══════════════════════════════════════════════════════════
const S = { bg:"#F4F1EB", dark:"#0F0F0F", red:"#DD1D21", yellow:"#FBCE07", white:"#FFFFFF", border:"#DDD9D0", muted:"#888", text:"#222" };
const selSt = { width:"100%", border:`1.5px solid ${S.border}`, borderRadius:6, padding:"10px 12px", fontFamily:"inherit", fontSize:14, color:S.text, background:S.white, outline:"none", appearance:"none", boxSizing:"border-box", cursor:"pointer", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:36 };
const inpSt = { width:"100%", border:`1.5px solid ${S.border}`, borderRadius:6, padding:"10px 12px", fontFamily:"inherit", fontSize:14, color:S.text, background:S.white, outline:"none", appearance:"none", boxSizing:"border-box" };
const Lbl  = ({ t, req }) => <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:S.muted, marginBottom:6 }}>{t}{req && <span style={{ color:S.red }}> *</span>}</div>;
const G2   = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>{children}</div>;
const Chip = ({ label, active, onClick }) => <button onClick={onClick} style={{ border:`1.5px solid ${active?S.red:S.border}`, borderRadius:20, padding:"6px 14px", cursor:"pointer", background:active?"#fff0f0":S.white, fontFamily:"inherit", fontSize:12, fontWeight:active?700:400, color:active?S.red:S.muted }}>{label}</button>;
const ShellLogo = () => <svg width="36" height="36" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FBCE07"/><path d="M50 8C28 8 12 24 12 46c0 11 5 21 13 28l11-8c-6-5-10-12-10-20 0-14 11-25 24-25s24 11 24 25c0 8-4 15-10 20l11 8c8-7 13-17 13-28C88 24 72 8 50 8z" fill="#DD1D21"/><path d="M36 66l14 26 14-26c-5 4-9.5 6-14 6s-9-2-14-6z" fill="#DD1D21"/></svg>;

export default function App() {
  const [sector,  setSector]  = useState("auto");
  const [brand,   setBrand]   = useState("");
  const [model,   setModel]   = useState("");
  const [year,    setYear]    = useState("");
  const [engine,  setEngine]  = useState("");
  const [equipType,    setEquipType]    = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [machineModel, setMachineModel] = useState("");
  const [tempRange,    setTempRange]    = useState("");
  const [loadType,     setLoadType]     = useState("");
  const [result,   setResult]  = useState(null);
  const [noMatch,  setNoMatch] = useState(false);
  const [searched, setSearched]= useState(false);
  const [brandSearch, setBrandSearch] = useState("");

  const models   = brand && VEHICLES[brand] ? VEHICLES[brand] : [];
  const isMoto   = MOTOS.includes(brand);
  const isPL     = PL.includes(brand);
  const engines  = isMoto ? ["Essence"] : isPL ? ["Diesel"] : ["Essence","Diesel","Hybride","Électrique","GPL"];

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
        <div style={{ background:S.red, color:S.white, fontSize:9, fontWeight:800, letterSpacing:2, padding:"3px 8px", borderRadius:2 }}>GUIDE EXPERT</div>
      </div>

      {/* HERO */}
      <div style={{ background:S.dark, padding:"36px 20px 30px", borderBottom:`4px solid ${S.yellow}` }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:4, textTransform:"uppercase", color:S.yellow, marginBottom:8 }}>Recommandations lubrifiantes Shell</div>
        <div style={{ fontSize:"clamp(24px,5vw,48px)", fontWeight:900, lineHeight:1.05, color:S.white, marginBottom:12 }}>
          Normes exactes<br /><span style={{ color:S.yellow }}>par constructeur & modèle</span>
        </div>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, lineHeight:1.7 }}>
          Spécifications OEM officielles · 80+ marques · Viscosité exacte · Carnet d'entretien respecté
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
                {/* MARQUE */}
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

                {/* MODÈLE */}
                {brand && models.length > 0 && (
                  <div style={{ marginBottom:14 }}>
                    <Lbl t="Modèle" />
                    <select style={selSt} value={model} onChange={e => setModel(e.target.value)}>
                      <option value="">— Sélectionnez un modèle —</option>
                      {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {model && <div style={{ marginTop:4, fontSize:11, color:"#2d9e2d" }}>✓ La recommandation sera adaptée à votre modèle exact</div>}
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
                    {["Pompe hydraulique","Compresseur","Réducteur / engrenage","Convoyeur","Machine-outil","Turbine","Groupe électrogène"].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <G2>
                  <div><Lbl t="Fabricant" /><input style={inpSt} value={manufacturer} onChange={e=>setManufacturer(e.target.value)} placeholder="ex: Atlas Copco…" /></div>
                  <div><Lbl t="Modèle / Réf." /><input style={inpSt} value={machineModel} onChange={e=>setMachineModel(e.target.value)} placeholder="ex: GA 15…" /></div>
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
                🔍 Trouver le lubrifiant Shell
              </button>
              {searched && <button onClick={reset} style={{ background:"none", border:`1px solid ${S.border}`, borderRadius:6, padding:"13px 18px", fontSize:13, color:S.muted, cursor:"pointer", fontFamily:"inherit" }}>↺</button>}
            </div>
          </div>
        </div>

        {/* RÉSULTAT */}
        {result && (
          <div style={{ animation:"fadeUp 0.4s ease" }}>
            {sector==="auto" && brand && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                <span style={{ background:S.dark, color:S.yellow, fontWeight:700, fontSize:12, padding:"4px 12px", borderRadius:20 }}>
                  {brand}{model?` · ${model}`:""}{year?` · ${year}`:""}{engine?` · ${engine}`:""}
                </span>
              </div>
            )}

            <div style={{ background:S.dark, borderRadius:10, padding:"20px", marginBottom:14, borderLeft:`5px solid ${S.yellow}` }}>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:6 }}>🛢️ Produit Shell recommandé</div>
              <div style={{ fontSize:22, fontWeight:900, color:S.white, lineHeight:1.2 }}>{result.produit}</div>
              {result.viscosité && result.viscosité !== "N/A" && (
                <span style={{ display:"inline-block", marginTop:8, background:S.yellow, color:S.dark, fontFamily:"monospace", fontWeight:700, fontSize:12, padding:"3px 10px", borderRadius:3 }}>
                  Viscosité : {result.viscosité}
                </span>
              )}
              <div style={{ marginTop:12, fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.7 }}>{result.raison}</div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))", gap:12, marginBottom:12 }}>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>📋 Normes constructeur</div>
                <div style={{ fontSize:11, color:S.text, lineHeight:1.9, fontFamily:"monospace" }}>{result.normes}</div>
              </div>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>🔁 {result.vidange?"Intervalle vidange":"Intervalle"}</div>
                <div style={{ fontSize:14, fontWeight:700, color:S.text }}>{result.vidange||result.intervalle}</div>
              </div>
              <div style={{ background:S.white, borderRadius:8, padding:"14px 16px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, textTransform:"uppercase", color:S.yellow, background:S.dark, display:"inline-block", padding:"2px 7px", borderRadius:2, marginBottom:8 }}>{result.complement?"➕ Complémentaire":"⚠️ Vigilance"}</div>
                <div style={{ fontSize:12, color:S.text, lineHeight:1.6 }}>{result.complement||result.vigilance}</div>
              </div>
            </div>

            {result.vigilance && result.complement && (
              <div style={{ background:"#FFF8E1", border:`1px solid ${S.yellow}`, borderRadius:8, padding:"12px 16px", fontSize:12, color:"#555", lineHeight:1.7, marginBottom:12 }}>
                <strong>⚠️ Point de vigilance :</strong> {result.vigilance}
              </div>
            )}

            <div style={{ background:"#f9f9f9", border:`1px solid ${S.border}`, borderRadius:6, padding:"10px 14px", fontSize:11, color:S.muted, lineHeight:1.6 }}>
              ℹ️ Recommandation basée sur les spécifications OEM officielles. Vérifiez toujours votre carnet d'entretien et les bulletins techniques de votre constructeur.
            </div>
          </div>
        )}

        {noMatch && (
          <div style={{ background:S.white, borderRadius:10, padding:24, textAlign:"center", border:`1px solid ${S.border}`, animation:"fadeUp 0.4s ease" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>Aucune correspondance</div>
            <p style={{ fontSize:13, color:S.muted, lineHeight:1.6, maxWidth:320, margin:"0 auto" }}>
              Essayez avec une autre combinaison ou contactez votre distributeur Shell agréé pour une recommandation personnalisée.
            </p>
          </div>
        )}
      </div>

      <div style={{ background:S.dark, padding:"14px 20px", textAlign:"center", fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:1 }}>
        © Shell LubriGuide · Basé sur les spécifications OEM officielles des constructeurs · Données indicatives
      </div>
    </div>
  );
}
