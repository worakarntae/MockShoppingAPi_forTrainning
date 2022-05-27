*** Settings ***
Library               RequestsLibrary
Library               Collections
Library               String
Test Setup            Create Session        alias=shop-service   url=http://localhost:3060     disable_warnings=1


*** Test Cases ***
ซื้อ 43 Price Dinner Set
    ตรวจสอบสินค้าทั้งหมดมี 2 ชิ้นและราคาชิ้นที่ 1 ต้องเท่ากับ 12.95
    สินค้าชิ้นที่ 2 ต้องมีชื่อว่า 43 Piece dinner Set
    สั่งซื้อสินค้าและมียอดรวมเท่ากับ 259
    จ่ายเงินตามหมายเลข 8004359122 จะได้ข้อความแจ้งเตือน วันเวลาที่ชำระเงิน 1/3/2020 13:30:00 หมายเลขคำสั่งซื้อ 8004359122 คุณสามารถติดตามสินค้าผ่านช่องทาง Kerry หมายเลข 1785261900



*** Variables ***
# สร้างแบบ dictionary
&{headers}              Accept=application/json
&{item}                 product_id=2    quantity=20
@{carts}                &{item}
# Dictionary
&{ORDER}                product_id=2
...                     quantity=20    

&{CONFIRM}              order_id=8004359122


*** Keywords ***
ตรวจสอบสินค้าทั้งหมดมี ${total} ชิ้นและราคาชิ้นที่ ${sequence} ต้องเท่ากับ ${price}
    ${response}=   Get On Session        shop-service    /product      headers=&{headers} 
    Status Should Be      200      ${response}
    Should Be Equal As Integers    2     ${response.json()["data"]["total"]}
    Should Be Equal As Numbers     ${price}     ${response.json()["data"]["products"][${sequence}]["product_price"]}


สินค้าชิ้นที่ ${id} ต้องมีชื่อว่า ${product_name}
    ${response}=   Get On Session        shop-service     /product/${id}      headers=&{headers} 
    Status Should Be      200      ${response}
    &{product}=     Set Variable    ${response.json()["data"]}
    Log To Console  ${product.product_name}


สั่งซื้อสินค้าและมียอดรวมเท่ากับ ${total_price}
    ${response}=    Post On Session    shop-service    /order    json=&{ORDER}
    Status Should Be    200    ${response}
    Should Be Equal As Integers    8004359122    ${response.json()["data"]["order_id"]}
    Should Be Equal As Numbers    ${total_price}    ${response.json()["data"]["total_price"]}
    RETURN     ${response.json()["data"]["order_id"]}
    

จ่ายเงินตามหมายเลข ${order_id} จะได้ข้อความแจ้งเตือน ${notification_message}
    Set To Dictionary    ${CONFIRM}     order_id=${order_id}
    ${response}=    Post On Session    shop-service    /confirmPayment    headers=${HEADERS}    json=&{CONFIRM}
    Status Should Be    200    ${response}
    Should Be Equal    ${notification_message}    ${response.json()["data"]["notify_message"]}
