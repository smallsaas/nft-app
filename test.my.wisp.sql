-- 玩家 【 18933934127 a123456 好了嗎 id=38 】
-- 玩家 【 18689911298 c123456 得瑟了 id=20 】

select * from nft_prod.nft_player where mobile_phone = '18689911298'

-- 玩家有多少條預約記錄
select nft_wisp_booking_record.* from nft_wisp_booking_record
LEFT JOIN nft_player ON nft_player.id = nft_wisp_booking_record.player_id
where nft_player.mobile_phone = '18689911298' order by create_time desc


-- 玩家當前匹配 (當天)
SELECT t1.*,t2.end_time                                AS endTime,
    t3.name                                            AS buyerName,
    t3.mobile_phone                                    AS buyerPhone,
    t4.name                                            AS wispName,
    t5.name                                            AS sellerName,
    t5.mobile_phone                                    AS sellerPhone,
    t6.wisp_number                                     AS wispNumber,
    TIMESTAMPDIFF(MINUTE, CURRENT_TIME(), DATE_ADD(t2.end_time, INTERVAL 2 HOUR)) AS remainingMinutes
    FROM nft_wisp_order AS t1
                LEFT JOIN nft_marketing_session AS t2 on t1.marketing_session_id = t2.id
                LEFT JOIN nft_player AS t3 on t1.buyer_play_id = t3.id
                LEFT JOIN nft_wisp AS t4 on t1.wisp_id = t4.id
                LEFT JOIN nft_player AS t5 ON t1.seller_play_id = t5.id
                LEFT JOIN nft_wisp_instance AS t6 ON t1.wisp_instance_id = t6.id
    WHERE t1.buyer_play_id = 20
        AND DATE_FORMAT(t1.create_time, '%Y-%m-%d') = DATE_FORMAT(CURDATE(), '%Y-%m-%d')
    ORDER BY t1.create_time DESC
