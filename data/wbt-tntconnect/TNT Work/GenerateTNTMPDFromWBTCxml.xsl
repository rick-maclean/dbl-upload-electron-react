<?xml version="1.0" encoding="UTF-8"?>
<!--Stylesheet for converting XML output of Wycliffe statements to TNTConnect import file-->
<!--Version=0.2
CHANGES since last version:
DONATION_ID is built rather than completely random
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0"
    xmlns:wbtc="http://xml.wycliffe.ca/finance/statement/v1"
    xmlns:random="http://exslt.org/random"
    extension-element-prefixes="random">
    <xsl:output method="text" encoding="UTF-8"/>
    <!--<xsl:strip-space elements="*"/>-->
        <xsl:preserve-space elements="*"/>
    <xsl:template match="wbtc:statement">
        <xsl:text>
[ORGANIZATION]&#13;
Name=Wycliffe Canada&#13;
Abbreviation=WBTC&#13;
Code=WBT-CAD&#13;
DefaultCurrencyCode=CAD&#13;
[DONORS]&#13;</xsl:text>
        <!--        <xsl:apply-templates/>
    </xsl:template>-->
        <!--    <xsl:template match="wbtc:header"/>
    <xsl:template match="wbtc:transactionList">
        <xsl:apply-templates select="wbtc:transaction[@tranType='donation']"/>
    </xsl:template>
    <xsl:template match="wbtc:transaction">
        blah
    </xsl:template>-->
        <xsl:for-each select="wbtc:donorList">
            <xsl:text>"PEOPLE_ID","ACCT_NAME","PERSON_TYPE","LAST_NAME_ORG","FIRST_NAME","MIDDLE_NAME","TITLE","SUFFIX","SP_LAST_NAME","SP_FIRST_NAME","SP_MIDDLE_NAME","SP_TITLE","SP_SUFFIX","ADDR1","ADDR2","ADDR3","ADDR4","CITY","STATE","ZIP","COUNTRY","CNTRY_DESCR","ADDR_CHANGED","PHONE","PHONE_CHANGED"&#13;&#10;</xsl:text>
            <xsl:for-each select="wbtc:donor">
                <!--PEOPLE_ID donorID -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:donorID"/>
                <xsl:text>",</xsl:text>
                <!--ACCT_NAME name -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:name"/>
                <xsl:text>",</xsl:text>
                <!--PERSON_TYPE Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--LAST_NAME_ORG = last word of wbtc:name -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="tokenize(wbtc:name,' ')[last()]"/>
                <xsl:text>",</xsl:text>
                <!--FIRST_NAME = first word of wbtc:name -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="tokenize(wbtc:name,' ')[1]"/>
                <xsl:text>",</xsl:text>
                <!--MIDDLE_NAME Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--TITLE Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SUFFIX Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SP_LAST_NAME Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SP_FIRST_NAME Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SP_MIDDLE_NAME Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SP_TITLE Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--SP_SUFFIX Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--ADDR1 addr1 WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:addr1"/>
                <xsl:text>",</xsl:text>
                <!--ADDR2 addr2 WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:addr2"/>
                <xsl:text>",</xsl:text>
                <!--ADDR3 addr3 WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:addr3"/>
                <xsl:text>",</xsl:text>
                <!--ADDR4 addr4 WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:addr4"/>
                <xsl:text>",</xsl:text>
                <!--CITY city WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:city"/>
                <xsl:text>",</xsl:text>
                <!--STATE prov WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:prov"/>
                <xsl:text>",</xsl:text>
                <!--ZIP pcode WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:pcode"/>
                <xsl:text>",</xsl:text>
                <!--COUNTRY countryCode WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:countryCode"/>
                <xsl:text>",</xsl:text>
                <!--CNTRY_DESCR country WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:country"/>
                <xsl:text>",</xsl:text>
                <!--ADDR_CHANGED Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--PHONE Not in current WBTC xml -->
                <xsl:text>"",</xsl:text>
                <!--PHONE_CHANGED Not in current WBTC xml -->
                <xsl:text>""</xsl:text>
                <xsl:text>&#13;&#10;</xsl:text>
            </xsl:for-each>
        </xsl:for-each>
        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:for-each select="wbtc:transactionList">
            <xsl:text>[GIFTS]&#13;</xsl:text>
            <xsl:text>"PEOPLE_ID","ACCT_NAME","DISPLAY_DATE","AMOUNT","DONATION_ID","DESIGNATION","MEMO","MOTIVATION","PAYMENT_METHOD"</xsl:text>
            <xsl:text>&#13;</xsl:text>
            <xsl:for-each select="wbtc:transaction[@tranType='donation' and wbtc:glAcct!='3-5031']">
                <!--PEOPLE_ID donorID WBTC xml -->
                <xsl:text>"</xsl:text>
                <!--If anonymous then there will be no donor ID but we still need to capture it-->
                <xsl:if test="@anonymous='true'">
                    <xsl:text>ANONYM</xsl:text>
                </xsl:if>
                <xsl:value-of select="wbtc:donorID"/>
                <xsl:variable name="currentDonorID" select="wbtc:donorID"/>
                <xsl:text>",</xsl:text>
                <!--ACCT_NAME match the donorID to donor/donorID and use the donor/name WBTC xml -->
                <xsl:text>"</xsl:text>
                <!--If anonymous then there will be no donor ID but we still need to capture it-->
                <xsl:if test="@anonymous='true'">
                    <xsl:text>ANONYM</xsl:text>
                </xsl:if>
                <xsl:value-of select="//wbtc:donor[wbtc:donorID=$currentDonorID]/wbtc:name"/>
                <xsl:text>",</xsl:text>
                <!--DISPLAY_DATE date WBTC xml (YYYY-MM-DD needs to be changed to MM/DD/YYYY  -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="substring(wbtc:date,6,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(wbtc:date,9,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(wbtc:date,1,4)"/>
                <xsl:text>",</xsl:text>
                <!--AMOUNT amount WBTC xml (needs to be inverted)-->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:amount*-1"/>
                <xsl:text>",</xsl:text>
                <!--DONATION_ID Not in current WBTC xml - Just generating a current time stamp as a unique identifier. Transaction number should go here. -->
                <xsl:text>"</xsl:text>
<!--                <xsl:variable name="rndID" select="string(random:random-sequence(1,wbtc:donorID))"/>
                <xsl:value-of select="substring($rndID,3)"/>-->
                <!--DONATION_ID Not in current WBTC xml - Generating a unique identifier from MMDDYYYYDonorIDAmt. Transaction number should go here. -->
                <!--DATE MMDDYYYY-->
                <xsl:value-of select="substring(wbtc:date,6,2)"/>
                <xsl:value-of select="substring(wbtc:date,9,2)"/>
                <xsl:value-of select="substring(wbtc:date,3,2)"/>
                <!--DONOR ID-->
                <!--If anonymous then there will be no donor ID but we still need to capture it-->
                <xsl:if test="@anonymous='true'">
                    <xsl:text>ANONYM</xsl:text>
                </xsl:if>
                <xsl:value-of select="wbtc:donorID"/>
                <!--Transaction count number determined by the count of the element number-->
                <xsl:value-of select="position()"/>
                <xsl:text>",</xsl:text>
                <!--DESIGNATION subProject WBTC xml this is a 2 digit number or we could use the header\householdCode for the member -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="//wbtc:header/wbtc:householdCode"/>
                <xsl:text>",</xsl:text>
                <!--MEMO description WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="wbtc:description"/>
                <xsl:text>",</xsl:text>
                <!--MOTIVATION Not in current WBTC xml -->
                <xsl:text>"Unknown",</xsl:text>
                <!--PAYMENT_METHOD transaction[@method='CC|PAP|CK'] WBTC xml -->
                <xsl:text>"</xsl:text>
                <xsl:value-of select="@method"/>
                <xsl:text>"</xsl:text>
                <xsl:text>&#13;&#10;</xsl:text>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
