# MockShoppingAPi_forTrainning
MockShoppingAPi_forTrainning

###########################   API local host server     ###########################
>>>>>>install
req. node install
mkdir "ProjectName"// ProjectName==any    [optional]
cd "ProjectName"//ProjectName==any  [optional]

npm install
npm init
npm install express body-parser morgan cors --save


>>>>>>run service
cd Api_Server
node ShopService.js


###########################   robot framework     ###########################
>>>>>>run robot
cd RebotFramework
node robot shopping-cart1.robot