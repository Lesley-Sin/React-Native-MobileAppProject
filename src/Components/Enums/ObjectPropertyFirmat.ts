export enum ObjectPropertyFormat {
    Undefined='Undefined',

    //#region DateTime 

    /// <summary>
    /// 6/15/2009
    /// </summary>
    ShortDate='ShortDate',

    /// <summary>
    /// 2005-08-09
    /// </summary>
    DateISO='DateISO',

    /// <summary>
    /// Jun. 15, 2009
    /// </summary>
    CondensedDate='CondensedDate',

    /// <summary>
    /// Monday, June 15, 2009
    /// </summary>
    LongDate='LongDate',

    /// <summary>
    /// June 15
    /// </summary>
    MonthDay='MonthDay',

    /// <summary>
    /// June, 2009
    /// </summary>
    YearMonth='YearMonth',

    /// <summary>
    /// Monday, June 15, 2009 1:45 PM
    /// </summary>
    LongDateShortTime='LongDateShortTime',

    /// <summary>
    /// Monday, June 15, 2009 1:45:30 PM
    /// </summary>
    LongDateLongTime='LongDateLongTime',

    /// <summary>
    /// 6/15/2009 1:45 PM
    /// </summary>
    ShortDateShortTime='ShortDateShortTime',

    /// <summary>
    /// 6/15/2009 1:45:30 PM
    /// </summary>
    ShortDateLongTime='ShortDateLongTime',

    /// <summary>
    /// Jun. 15, 2009 1:45 PM
    /// </summary>
    CondensedDateTime='CondensedDateTime',

    /// <summary>
    /// 1:45 PM
    /// </summary>
    ShortTime='ShortTime',

    /// <summary>
    /// 1:45:30 PM
    /// </summary>
    LongTime='LongTime',

    /// <summary>
    /// 2005-08-09T18:31:42+03:30
    /// </summary>
    DateTimeISO='DateTimeISO',

    //#endregion

    //#region Duration

    /// <summary>
    /// 00:00:00
    /// </summary>
    DurationHMSTime='DurationHMSTime',

    /// <summary>
    /// 00:00
    /// </summary>
    DurationHMTime='DurationHMTime',

    /// <summary>
    /// hh:mm
    /// </summary>
    DurationHM='DurationHM',

    /// <summary>
    /// hh:mm:ss
    /// </summary>
    DurationHMS='DurationHMS',

    /// <summary>
    /// dd(8h):hh:mm
    /// </summary>
    DurationD8HM='DurationD8HM',

    /// <summary>
    /// dd(24h):hh:mm
    /// </summary>
    DurationD24HM='DurationD24HM',

    /// <summary>
    /// dd hh:mm:ss
    /// </summary>
    DurationFullShort='DurationFullShort',

    /// <summary>
    /// {dd} days {hh} hours {mm} minutes {ss} seconds 
    /// </summary>
    DurationFullLong='DurationFullLong',

    /// <summary>
    /// PnYnMnDTnHnMnS
    /// </summary>
    DurationISO='DurationISO',

    /// <summary>
    /// TimeSpan(3, 17, 25, 30, 500) -> 3.17:25:30.5000000
    /// </summary>
    DurationInvariant='DurationInvariant',

    //#endregion

    //#region Text

    /// <summary>
    /// Show reference as text
    /// </summary>
    Text='Text',

    /// <summary>
    /// Show reference as link
    /// </summary>
    Link='Link',

    /// <summary>
    /// Show text as usual
    /// </summary>
    PlainText='PlainText',

    /// <summary>
    /// Show text as html
    /// </summary>
    HtmlText='HtmlText',

    /// <summary>
    /// Show marked text
    /// </summary>
    MarkedText='MarkedText',

    //#endregion

    //#region Document

    /// <summary>
    /// Usual attachment
    /// </summary>
    Attachment='Attachment',

    /// <summary>
    /// Document for inline edit
    /// </summary>
    InlineDocument='InlineDocument',

    /// <summary>
    /// SignedDocument
    /// </summary>
    SignedDocument='SignedDocument',

    //#endregion

    //#region Link

    /// <summary>
    /// Url format for link
    /// </summary>
    Uri='Uri',

    /// <summary>
    /// Hypertext format for link
    /// </summary>
    Hypertext='Hypertext'

    //#endregion

};