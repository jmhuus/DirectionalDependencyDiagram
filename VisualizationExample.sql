IF OBJECT_ID('tempdb..##Tmp_GatherContacts') IS NOT NULL
    DROP TABLE ##Tmp_GatherContacts;
SELECT
    T1.FirstName,
    T1.LastName,
    T3.Address,
    T3.Age
INTO ##Tmp_GatherContacts
FROM ServerTable1 AS T1
JOIN ServerTable2 AS T2
    ON T1.ID = T2.ID
JOIN ServerTable3 AS T3
    ON T2.ID = T3.ID;


IF OBJECT_ID('tempdb..##Tmp_Consolidate') IS NOT NULL
    DROP TABLE ##Tmp_Consolidate;
SELECT
    GETDATE() AS InsertDate,
    *
INTO ##Tmp_Consolidate
FROM ##Tmp_GatherContacts
WHERE Age >= 21;


IF OBJECT_ID('tempdb..##Tmp_GatherLeadInfo') IS NOT NULL
    DROP TABLE ##Tmp_GatherLeadInfo;
SELECT
    T1.FirstName,
    T1.LastName,
    T1.Address,
    T1.Age,
    T4.LastContact,
    T4.ConversionDate
INTO ##Tmp_GatherLeadInfo
FROM ##Tmp_Consolidate AS T1
JOIN ServerTable7 AS T2
    ON T1.ID = T2.ID
JOIN ServerTable8 AS T3
    ON T2.ID = T3.ID
JOIN ServerTable9 AS T4
    ON T3.ID = T4.ID


IF OBJECT_ID('tempdb..##Tmp_Format') IS NOT NULL
    DROP TABLE ##Tmp_Format;
SELECT
    T1.FirstName,
    T1.LastName,
    T1.Address,
    T1.Age,
    T4.LastContact,
    T4.ConversionDate
INTO ##Tmp_Format
FROM ##Tmp_Consolidate AS T1
JOIN ##Tmp_GatherLeadInfo AS T2
    ON T1.ID = T2.ID






//
