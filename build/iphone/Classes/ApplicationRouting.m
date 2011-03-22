/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes *will* be lost.
 * Generated code is Copyright (c) 2009-2010 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>
#import "ApplicationRouting.h"

extern NSData * decode64 (NSData * thedata); 
extern NSData * dataWithHexString (NSString * hexString);
extern NSData * decodeDataWithKey (NSData * thedata, NSString * key);

@implementation ApplicationRouting

+ (NSData*) resolveAppAsset:(NSString*)path;
{
     static NSMutableDictionary *map;
     if (map==nil)
     {
         map = [[NSMutableDictionary alloc] init];
         [map setObject:dataWithHexString(@"54692e55492e7365744261636b67726f756e64436f6c6f7228272366666627293b7661722074616247726f75703d54692e55492e63726561746554616247726f757028293b76617220686f6d6557696e646f773d54692e55492e63726561746557696e646f77287b7469746c653a27527853686f727461676573272c75726c3a276d61696e5f77696e646f77732f626c6f67732e6a73272c626172436f6c6f723a2723333336363939277d293b76617220686f6d655461623d54692e55492e637265617465546162287b7469746c653a2753686f727461676573272c69636f6e3a27696d616765732f686f6d655f32342e706e67272c77696e646f773a686f6d6557696e646f777d293b766172207472656e6457696e646f773d54692e55492e63726561746557696e646f77287b7469746c653a275472656e6473272c75726c3a276a732f7472656e64732e6a73272c626172436f6c6f723a2723333336363939277d293b766172207472656e645461623d54692e55492e637265617465546162287b7469746c653a275472656e6473272c69636f6e3a27696d616765732f6172726f775f32342e706e67272c77696e646f773a7472656e6457696e646f777d293b766172206665656457696e646f773d54692e55492e63726561746557696e646f77287b7469746c653a2753686f7274616765732046656564272c75726c3a276a732f666565642e6a73272c626172436f6c6f723a2723333336363939277d293b76617220666565645461623d54692e55492e637265617465546162287b7469746c653a2746656564272c69636f6e3a27696d616765732f7273735f32342e706e67272c77696e646f773a6665656457696e646f777d293b766172207265706f727457696e646f773d54692e55492e63726561746557696e646f77287b7469746c653a225265706f727420447275672053686f7274616765222c75726c3a276d61696e5f77696e646f77732f7265706f72742e6a73272c626172436f6c6f723a2723333336363939277d293b766172207265706f72745461623d54692e55492e637265617465546162287b69636f6e3a27696d616765732f70686f6e655f32342e706e67272c7469746c653a275265706f7274272c77696e646f773a7265706f727457696e646f777d293b7661722061626f757457696e646f773d54692e55492e63726561746557696e646f77287b7469746c653a2241626f7574222c75726c3a276d61696e5f77696e646f77732f61626f75742e6a73272c626172436f6c6f723a2723333336363939277d293b7661722061626f75745461623d54692e55492e637265617465546162287b69636f6e3a27696d616765732f696e666f5f32342e706e67272c7469746c653a2741626f7574272c77696e646f773a61626f757457696e646f777d293b74616247726f75702e61646454616228686f6d65546162293b74616247726f75702e6164645461622866656564546162293b74616247726f75702e616464546162287472656e64546162293b74616247726f75702e616464546162287265706f7274546162293b74616247726f75702e6164645461622861626f7574546162293b74616247726f75702e6f70656e287b7472616e736974696f6e3a54692e55492e6950686f6e652e416e696d6174696f6e5374796c652e4355524c5f55507d293b69662854692e4e6574776f726b2e6f6e6c696e65297b76617220616477696e3d54692e55492e63726561746557696e646f77287b77696474683a276175746f272c6865696768743a276175746f272c626f74746f6d3a34397d293b76617220696164733d54692e55492e694f532e637265617465416456696577287b77696474683a276175746f272c6865696768743a276175746f272c7a496e6465783a312c626f74746f6d3a307d293b696164732e6164644576656e744c697374656e657228276c6f6164272c66756e6374696f6e28297b54692e4150492e696e666f28224c4f4144454422293b7d293b696164732e6164644576656e744c697374656e657228276572726f72272c66756e6374696f6e28297b54692e4150492e696e666f28224552524f52204c4f4144494e472069416422293b7d293b616477696e2e6164642869616473293b616477696e2e6f70656e28293b7d") forKey:@"app_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f773b77696e2e6261636b67726f756e64436f6c6f723d2723666666666666273b76617220776562766965773d54692e55492e63726561746557656256696577287b7363616c6550616765546f4669743a747275652c626f74746f6d3a302c75726c3a27687474703a2f2f6d69636b736368726f656465722e636f6d2f706861726d6163792f70617273652f70617273652e7068703f4c696e6b3d272b77696e2e74686555726c7d293b77696e2e6164642877656276696577293b") forKey:@"js/article_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f773b76617220776562766965773d54692e55492e63726561746557656256696577287b7363616c6550616765546f4669743a747275652c68746d6c3a273c68746d6c3e3c686561643e3c7374796c6520747970653d22746578742f637373223e2a207b206d61782d77696474683a2032373070783b207d20626f6479207b2070616464696e673a20313070783b20666f6e742d66616d696c793a2068656c766574696361206e6575652c2068656c7665746963612c20617269616c3b2077696474683a2032373070783b206f766572666c6f773a2068696464656e3b20636f6c6f72203a20233366336633663b207d2068312c68322c68332c68342c6835207b20636f6c6f723a20626c61636b3b207d20696d67207b206d61782d77696474683a2032373070783b207d20707265207b2077686974652d73706163653a207072652d777261703b207d3c2f7374796c653e3c626f64793e3c68333e272b77696e2e7468655469746c652b273c2f68333e272b77696e2e646573632b273c2f626f64793e3c2f68746d6c3e277d293b69662854692e506c6174666f726d2e6e616d653d3d276950686f6e65204f5327290a7b76617220627574746f6e3d54692e55492e637265617465427574746f6e287b7469746c653a27566965772046756c6c2041727469636c65277d293b77696e2e736574546f6f6c626172285b627574746f6e5d293b627574746f6e2e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28297b54692e506c6174666f726d2e6f70656e55524c2877696e2e74686555726c293b7d293b7d0a69662854692e506c6174666f726d2e6e616d653d3d27616e64726f696427297b7661722061637469766974793d54692e416e64726f69642e63757272656e7441637469766974793b61637469766974792e6f6e4372656174654f7074696f6e734d656e753d66756e6374696f6e2865297b766172206d656e753d652e6d656e753b766172206d656e754974656d3d6d656e752e616464287b7469746c653a22566965772046756c6c2041727469636c65227d293b6d656e754974656d2e6164644576656e744c697374656e65722822636c69636b222c66756e6374696f6e2865297b54692e506c6174666f726d2e6f70656e55524c2877696e2e74686555726c293b7d293b7d3b7d0a77696e2e6164642877656276696577293b") forKey:@"js/articleFDA_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f772c646174612c666c616749636f6e2c6e6577526f772c71756572792c7369746555726c3b77696e2e6261636b67726f756e64436f6c6f723d2723666666273b76617220616374496e643d54692e55492e6372656174654163746976697479496e64696361746f72287b7a496e6465783a312c746f703a276175746f272c6865696768743a3130302c77696474683a3231302c636f6c6f723a27626c61636b272c666f6e743a7b666f6e7446616d696c793a2748656c766574696361204e657565272c666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c6d6573736167653a274c6f6164696e672e2e2e272c7374796c653a54692e55492e6950686f6e652e4163746976697479496e64696361746f725374796c652e4441524b7d293b77696e2e61646428616374496e64293b616374496e642e73686f7728293b766172207461626c65566965773d54692e55492e6372656174655461626c6556696577287b7d293b69662854692e4e6574776f726b2e6f6e6c696e65297b71756572793d2273656c656374207469746c652c6c696e6b2c707562446174652066726f6d207273732077686572652075726c20696e20285c27687474703a2f2f7777772e617368702e6f72672f7273732f73686f7274616765732f5c272c5c27687474703a2f2f7777772e617368702e6f72672f7273732f7265736f6c7665642f5c272c5c27687474703a2f2f7777772e617368702e6f72672f7273732f6e6f74617661696c61626c652f5c2729207c20736f7274286669656c643d5c22707562446174655c222c2064657363656e64696e673d5c22747275655c2229207c207472756e6361746528636f756e743d323529223b66756e6374696f6e207365744461746128297b54692e5961686f6f2e79716c2871756572792c66756e6374696f6e2865297b646174613d652e646174613b766172207461626c65446174613d5b5d3b666f722876617220693d302c6a3d646174612e6974656d2e6c656e6774683b693c6a3b692b2b297b6e6577526f773d54692e55492e6372656174655461626c6556696577526f77287b706174683a2761727469636c652e6a73272c75726c3a646174612e6974656d5b695d2e6c696e6b2c6861734368696c643a747275652c7468655469746c653a646174612e6974656d5b695d2e7469746c652c636c6173734e616d653a27647275675f726f77272c6865696768743a36352c6261636b67726f756e644772616469656e743a7b747970653a276c696e656172272c636f6c6f72733a5b7b636f6c6f723a2723663866396661272c706f736974696f6e3a302e307d2c7b636f6c6f723a2723653665396562272c706f736974696f6e3a312e307d5d7d7d293b696628646174612e6974656d5b695d2e6c696e6b2e696e6465784f6628275265736f6c76656453686f7274616765732729213d2d31297b666c616749636f6e3d27677265656e273b7d656c736520696628646174612e6974656d5b695d2e6c696e6b2e696e6465784f66282744727567734e6f4c6f6e676572417661696c61626c652729213d2d31297b666c616749636f6e3d27726564273b7d656c736520696628646174612e6974656d5b695d2e6c696e6b2e696e6465784f66282743757272656e7453686f7274616765732729213d2d31297b666c616749636f6e3d2779656c6c6f77273b7d0a76617220666c61673d54692e55492e637265617465496d61676556696577287b696d6167653a272e2e2f696d616765732f272b666c616749636f6e2b272e706e67272c77696474683a33322c6865696768743a33322c6c6566743a31302c746f703a31357d293b76617220646174653d54692e55492e6372656174654c6162656c287b746578743a646174612e6974656d5b695d2e707562446174652c636f6c6f723a2723343434272c746f703a332c6c6566743a36302c6865696768743a32302c77696474683a3235352c666f6e743a7b666f6e745765696768743a276e6f726d616c272c666f6e7453697a653a31327d7d293b766172207469746c653d54692e55492e6372656174654c6162656c287b746578743a646174612e6974656d5b695d2e7469746c652c636f6c6f723a2723343434272c746f703a32302c6c6566743a36302c6865696768743a276175746f272c77696474683a3232352c666f6e743a7b666f6e745765696768743a27626f6c64272c666f6e7453697a653a31357d7d293b6e6577526f772e61646428666c6167293b6e6577526f772e6164642864617465293b6e6577526f772e616464287469746c65293b7461626c65446174612e70757368286e6577526f77293b7d0a7461626c65566965772e73657444617461287461626c6544617461293b7d293b7d0a7365744461746128293b54692e55492e63757272656e7457696e646f772e616464287461626c6556696577293b616374496e642e6869646528293b7461626c65566965772e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e2865297b696628652e726f77446174612e70617468297b766172206e657757696e3d54692e55492e63726561746557696e646f77287b75726c3a652e726f77446174612e706174682c626172436f6c6f723a54692e55492e63757272656e7457696e646f772e626172436f6c6f727d293b6e657757696e2e646573633d652e726f77446174612e646573633b6e657757696e2e74686555726c3d652e726f77446174612e75726c3b7d0a54692e55492e63757272656e745461622e6f70656e286e657757696e2c7b616e696d617465643a747275657d293b7d293b76617220726566726573683d54692e55492e637265617465427574746f6e287b73797374656d427574746f6e3a54692e55492e6950686f6e652e53797374656d427574746f6e2e524546524553487d293b69662854692e506c6174666f726d2e6e616d653d3d276950686f6e65204f5327297b77696e2e72696768744e6176427574746f6e3d726566726573683b7d656c73657b7d0a726566726573682e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28297b54692e4150492e6c6f67282772656672657368696e6727293b616374496e642e73686f7728293b7461626c65566965772e73657444617461286e756c6c293b7365744461746128293b616374496e642e6869646528293b7d293b7d656c73657b76617220616c6572744469616c6f673d54692e55492e637265617465416c6572744469616c6f67287b7469746c653a27434f4e4e454354494f4e20524551554952454421272c6d6573736167653a27596f757220646576696365206973206e6f74206f6e6c696e652e272c627574746f6e4e616d65733a5b274f4b275d7d293b616c6572744469616c6f672e73686f7728293b7d") forKey:@"js/feed_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f772c71756572792c7369746555726c3b77696e2e6261636b67726f756e64436f6c6f723d2723666666273b76617220616374496e643d54692e55492e6372656174654163746976697479496e64696361746f72287b746f703a276175746f272c6865696768743a35302c77696474683a3231302c636f6c6f723a27626c61636b272c666f6e743a7b666f6e7446616d696c793a2748656c766574696361204e657565272c666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c6d6573736167653a274c6f6164696e672e2e2e272c7374796c653a54692e55492e6950686f6e652e4163746976697479496e64696361746f725374796c652e4441524b7d293b77696e2e61646428616374496e64293b616374496e642e73686f7728293b69662854692e4e6574776f726b2e6f6e6c696e65297b7369746555726c3d227777772e6664612e676f762f646f776e6c6f6164732f44727567732f447275675361666574792f4472756753686f7274616765732f55434d3136333137322e786d6c223b71756572793d2253656c656374207469746c652c206465736372697074696f6e2c206c696e6b2066726f6d207273732077686572652075726c3d27222b7369746555726c2b2227223b54692e5961686f6f2e79716c2871756572792c66756e6374696f6e2865297b766172207365617263683d54692e55492e637265617465536561726368426172287b73686f7743616e63656c3a747275657d293b76617220646174613d652e646174612c6e6577526f773b766172207461626c65566965773d54692e55492e6372656174655461626c6556696577287b7365617263683a7365617263682c66696c7465724174747269627574653a277468655469746c65277d293b666f722876617220693d303b693c646174612e6974656d2e6c656e6774683b692b2b297b6e6577526f773d54692e55492e6372656174655461626c6556696577526f77287b706174683a2761727469636c654644412e6a73272c75726c3a646174612e6974656d5b695d2e6c696e6b2c646573633a646174612e6974656d5b695d2e6465736372697074696f6e2c6861734368696c643a747275652c7468655469746c653a646174612e6974656d5b695d2e7469746c652c636c6173734e616d653a27647275675f726f77277d293b7661722061727469636c655469746c654c6162656c3d54692e55492e6372656174654c6162656c287b746578743a646174612e6974656d5b695d2e7469746c652c6c6566743a31302c72696768743a33302c666f6e743a7b666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d7d293b6e6577526f772e6164642861727469636c655469746c654c6162656c293b7461626c65566965772e617070656e64526f77286e6577526f77293b7d0a54692e55492e63757272656e7457696e646f772e616464287461626c6556696577293b616374496e642e6869646528293b7461626c65566965772e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e2865297b696628652e726f77446174612e70617468297b766172206e657757696e3d54692e55492e63726561746557696e646f77287b75726c3a652e726f77446174612e706174682c7469746c653a27527853686f727461676573272c626172436f6c6f723a54692e55492e63757272656e7457696e646f772e626172436f6c6f727d293b6e657757696e2e646573633d652e726f77446174612e646573633b6e657757696e2e74686555726c3d652e726f77446174612e75726c3b6e657757696e2e7468655469746c653d652e726f77446174612e7468655469746c653b7d0a54692e55492e63757272656e745461622e6f70656e286e657757696e2c7b616e696d617465643a747275657d293b7d293b7d293b7d0a656c73657b76617220616c6572744469616c6f673d54692e55492e637265617465416c6572744469616c6f67287b7469746c653a27434f4e4e454354494f4e20524551554952454421272c6d6573736167653a27596f757220646576696365206973206e6f74206f6e6c696e652e272c627574746f6e4e616d65733a5b274f4b275d7d293b616c6572744469616c6f672e73686f7728293b7d") forKey:@"js/getFDA_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f772c646174612c6e6577526f772c71756572792c7369746555726c3b77696e2e6261636b67726f756e64436f6c6f723d2723666666273b76617220616374496e643d54692e55492e6372656174654163746976697479496e64696361746f72287b7a496e6465783a312c746f703a276175746f272c6865696768743a3130302c77696474683a3231302c636f6c6f723a27626c61636b272c666f6e743a7b666f6e7446616d696c793a2748656c766574696361204e657565272c666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c6d6573736167653a274c6f6164696e672e2e2e272c7374796c653a54692e55492e6950686f6e652e4163746976697479496e64696361746f725374796c652e4441524b7d293b77696e2e61646428616374496e64293b616374496e642e73686f7728293b766172207365617263683d54692e55492e637265617465536561726368426172287b73686f7743616e63656c3a747275657d293b766172207461626c65566965773d54692e55492e6372656174655461626c6556696577287b7365617263683a7365617263682c66696c7465724174747269627574653a277468655469746c65277d293b69662854692e4e6574776f726b2e6f6e6c696e65297b69662854692e4170702e50726f706572746965732e676574537472696e672827776562736974654e616d6527293d3d2743757272656e742053686f72746167657327297b7369746555726c3d22687474703a2f2f7777772e617368702e6f72672f7273732f73686f7274616765732f223b7d656c73652069662854692e4170702e50726f706572746965732e676574537472696e672827776562736974654e616d6527293d3d275265736f6c7665642053686f72746167657327297b7369746555726c3d22687474703a2f2f7777772e617368702e6f72672f7273732f7265736f6c7665642f223b7d656c73652069662854692e4170702e50726f706572746965732e676574537472696e672827776562736974654e616d6527293d3d27556e617661696c61626c6520447275677327297b7369746555726c3d22687474703a2f2f7777772e617368702e6f72672f7273732f6e6f74617661696c61626c652f223b7d0a71756572793d2253656c656374206c696e6b2c207469746c652066726f6d207273732077686572652075726c3d27222b7369746555726c2b2227223b66756e6374696f6e207365744461746128297b54692e5961686f6f2e79716c2871756572792c66756e6374696f6e2865297b646174613d652e646174613b766172207461626c65446174613d5b5d3b666f722876617220693d302c6a3d646174612e6974656d2e6c656e6774683b693c6a3b692b2b297b6e6577526f773d54692e55492e6372656174655461626c6556696577526f77287b7468655469746c653a646174612e6974656d5b695d2e7469746c652c706174683a2761727469636c652e6a73272c75726c3a646174612e6974656d5b695d2e6c696e6b2c6861734368696c643a747275652c636c6173734e616d653a27647275675f726f77277d293b7661722061727469636c655469746c654c6162656c3d54692e55492e6372656174654c6162656c287b746578743a646174612e6974656d5b695d2e7469746c652c6c6566743a31302c72696768743a33302c666f6e743a7b666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c7d293b6e6577526f772e6164642861727469636c655469746c654c6162656c293b7461626c65446174612e70757368286e6577526f77293b7d0a7461626c65566965772e73657444617461287461626c6544617461293b7d293b7d0a7365744461746128293b54692e55492e63757272656e7457696e646f772e616464287461626c6556696577293b616374496e642e6869646528293b7461626c65566965772e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e2865297b696628652e726f77446174612e70617468297b766172206e657757696e3d54692e55492e63726561746557696e646f77287b75726c3a652e726f77446174612e706174682c626172436f6c6f723a54692e55492e63757272656e7457696e646f772e626172436f6c6f727d293b6e657757696e2e646573633d652e726f77446174612e646573633b6e657757696e2e74686555726c3d652e726f77446174612e75726c3b7d0a54692e55492e63757272656e745461622e6f70656e286e657757696e2c7b616e696d617465643a747275657d293b7d293b76617220726566726573683d54692e55492e637265617465427574746f6e287b73797374656d427574746f6e3a54692e55492e6950686f6e652e53797374656d427574746f6e2e524546524553487d293b69662854692e506c6174666f726d2e6e616d653d3d276950686f6e65204f5327297b77696e2e72696768744e6176427574746f6e3d726566726573683b7d656c73657b7d0a726566726573682e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28297b54692e4150492e6c6f67282772656672657368696e6727293b616374496e642e73686f7728293b7461626c65566965772e73657444617461286e756c6c293b7365744461746128293b616374496e642e6869646528293b7d293b7d656c73657b76617220616c6572744469616c6f673d54692e55492e637265617465416c6572744469616c6f67287b7469746c653a27434f4e4e454354494f4e20524551554952454421272c6d6573736167653a27596f757220646576696365206973206e6f74206f6e6c696e652e272c627574746f6e4e616d65733a5b274f4b275d7d293b616c6572744469616c6f672e73686f7728293b7d") forKey:@"js/getFeed_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f772c646174612c6e6577526f772c7369746555726c3b77696e2e6261636b67726f756e64436f6c6f723d2723666666273b76617220616374496e643d54692e55492e6372656174654163746976697479496e64696361746f72287b7a496e6465783a312c746f703a276175746f272c6865696768743a3130302c77696474683a3231302c636f6c6f723a27626c61636b272c666f6e743a7b666f6e7446616d696c793a2748656c766574696361204e657565272c666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c6d6573736167653a274c6f6164696e672e2e2e272c7374796c653a54692e55492e6950686f6e652e4163746976697479496e64696361746f725374796c652e4441524b7d293b77696e2e61646428616374496e64293b616374496e642e73686f7728293b766172207461626c65566965773d54692e55492e6372656174655461626c6556696577287b7d293b69662854692e4e6574776f726b2e6f6e6c696e65297b66756e6374696f6e207365744461746128297b766172206765744a534f4e3d54692e4e6574776f726b2e63726561746548545450436c69656e7428293b766172207461626c65446174613d5b5d3b6765744a534f4e2e6f70656e2827474554272c27687474703a2f2f6d69636b736368726f656465722e636f6d2f706861726d6163792f727873686f7274616765732f7472656e64732f6578616d706c652e66696c7465722e70687027293b6765744a534f4e2e73656e6428293b6765744a534f4e2e6f6e6c6f61643d66756e6374696f6e28297b76617220646174613d4a534f4e2e706172736528746869732e726573706f6e736554657874293b666f722876617220693d302c6a3d646174612e6c656e6774683b693c6a3b692b2b297b6e6577526f773d54692e55492e6372656174655461626c6556696577526f77287b7468655469746c653a646174615b695d5b315d2c706174683a2761727469636c652e6a73272c75726c3a646174615b695d5b305d2c6861734368696c643a747275652c636c6173734e616d653a27647275675f726f77277d293b7661722061727469636c655469746c654c6162656c3d54692e55492e6372656174654c6162656c287b746578743a692b312b272e20272b646174615b695d5b315d2c6c6566743a31302c72696768743a33302c666f6e743a7b666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c7d293b6e6577526f772e6164642861727469636c655469746c654c6162656c293b7461626c65446174612e70757368286e6577526f77293b7d0a7461626c65566965772e73657444617461287461626c6544617461293b7d7d0a7365744461746128293b54692e55492e63757272656e7457696e646f772e616464287461626c6556696577293b616374496e642e6869646528293b7461626c65566965772e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e2865297b696628652e726f77446174612e70617468297b766172206e657757696e3d54692e55492e63726561746557696e646f77287b75726c3a652e726f77446174612e706174682c626172436f6c6f723a54692e55492e63757272656e7457696e646f772e626172436f6c6f727d293b6e657757696e2e646573633d652e726f77446174612e646573633b6e657757696e2e74686555726c3d652e726f77446174612e75726c3b7d0a54692e55492e63757272656e745461622e6f70656e286e657757696e2c7b616e696d617465643a747275657d293b7d293b76617220726566726573683d54692e55492e637265617465427574746f6e287b73797374656d427574746f6e3a54692e55492e6950686f6e652e53797374656d427574746f6e2e524546524553487d293b69662854692e506c6174666f726d2e6e616d653d3d276950686f6e65204f5327297b77696e2e72696768744e6176427574746f6e3d726566726573683b7d656c73657b7d0a726566726573682e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28297b54692e4150492e6c6f67282772656672657368696e6727293b616374496e642e73686f7728293b7461626c65566965772e73657444617461286e756c6c293b7365744461746128293b616374496e642e6869646528293b7d293b7d656c73657b76617220616c6572744469616c6f673d54692e55492e637265617465416c6572744469616c6f67287b7469746c653a27434f4e4e454354494f4e20524551554952454421272c6d6573736167653a27596f757220646576696365206973206e6f74206f6e6c696e652e272c627574746f6e4e616d65733a5b274f4b275d7d293b616c6572744469616c6f672e73686f7728293b7d") forKey:@"js/trends_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f773b77696e2e6261636b67726f756e64436f6c6f723d2723453845384538273b77696e2e6c61796f75743d27766572746963616c273b766172206c313d54692e55492e6372656174654c6162656c287b746578743a2752782053686f7274616765732069732064657369676e656420746f2068656c70206865616c746820636172652070726f7669646572732061636365737320696e666f726d6174696f6e2061626f757420647275672073686f72746167657320717569636b6c7920616e6420656173696c792e5c6e5c6e43726561746564204279204d69636b20536368726f656465725c6e506861726d442043616e6469646174652032303131272c746f703a33302c6c6566743a31302c72696768743a31302c636f6c6f723a2723303030272c74657874416c69676e3a2763656e746572272c6865696768743a276175746f272c77696474683a276175746f272c7d293b77696e2e616464286c31293b7661722062313d54692e55492e637265617465427574746f6e287b7469746c653a27456d61696c3a206d736368726f6564657240676d61696c2e636f6d272c6865696768743a34302c77696474683a3239302c746f703a31307d293b77696e2e616464286231293b7661722062323d54692e55492e637265617465427574746f6e287b7469746c653a27687474703a2f2f6d69636b736368726f656465722e636f6d2f727873686f727461676573272c6865696768743a34302c77696474683a3239302c746f703a31302c7d293b77696e2e616464286232293b62312e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28290a7b76617220656d61696c4469616c6f673d54692e55492e637265617465456d61696c4469616c6f6728293b656d61696c4469616c6f672e7375626a6563743d22527853686f727461676573204170706c69636174696f6e223b656d61696c4469616c6f672e746f526563697069656e74733d5b276d736368726f6564657240676d61696c2e636f6d275d3b656d61696c4469616c6f672e6f70656e28293b7d293b62322e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28290a7b54692e506c6174666f726d2e6f70656e55524c2827687474703a2f2f6d69636b736368726f656465722e636f6d2f727873686f72746167657327293b7d293b") forKey:@"main_windows/about_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f773b76617220646174613d5b7b7469746c653a2743757272656e742053686f727461676573272c6861734368696c643a747275652c706174683a272e2e2f6a732f676574466565642e6a73272c6865616465723a2741534850205265706f7274656420447275672053686f727461676573277d2c7b7469746c653a275265736f6c7665642053686f727461676573272c6861734368696c643a747275652c706174683a272e2e2f6a732f676574466565642e6a73277d2c7b7469746c653a27556e617661696c61626c65204472756773272c6861734368696c643a747275652c706174683a272e2e2f6a732f676574466565642e6a73277d2c7b7469746c653a275265706f727465642053686f727461676573272c6861734368696c643a747275652c706174683a272e2e2f6a732f6765744644412e6a73272c6865616465723a27464441205265706f7274656420447275672053686f727461676573277d5d3b766172207461626c65566965773d54692e55492e6372656174655461626c6556696577287b646174613a646174612c7374796c653a54692e55492e6950686f6e652e5461626c65566965775374796c652e47524f555045442c666f6e743a7b666f6e7453697a653a31352c666f6e745765696768743a27626f6c64277d2c7d293b54692e55492e63757272656e7457696e646f772e616464287461626c6556696577293b7461626c65566965772e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e2865297b696628652e726f77446174612e70617468297b766172206e657757696e646f773d54692e55492e63726561746557696e646f77287b75726c3a652e726f77446174612e706174682c7469746c653a652e726f77446174612e7469746c652c626172436f6c6f723a2723333336363939277d293b54692e4170702e50726f706572746965732e736574537472696e672827776562736974654e616d65272c652e726f77446174612e7469746c65293b54692e55492e63757272656e745461622e6f70656e286e657757696e646f772c7b616e696d617465643a747275657d293b7d7d293b") forKey:@"main_windows/blogs_js"];
         [map setObject:dataWithHexString(@"7661722077696e3d54692e55492e63757272656e7457696e646f773b77696e2e6261636b67726f756e64436f6c6f723d2723453845384538273b77696e2e6c61796f75743d27766572746963616c273b766172206664613d54692e55492e6372656174654c6162656c287b636f6c6f723a2723303030272c746578743a275265706f727420746f204644413a272c746f703a32302c6c6566743a31302c77696474683a276175746f272c6865696768743a276175746f277d293b77696e2e61646428666461293b7661722062313d54692e55492e637265617465427574746f6e287b7469746c653a27456d61696c3a206472756773686f727461676573406664612e6868732e676f76272c6865696768743a34302c77696474683a3238302c746f703a31302c7d293b77696e2e616464286231293b7661722062323d54692e55492e637265617465427574746f6e287b7469746c653a2743616c6c3a202838383829203436332d36333332272c6865696768743a34302c77696474683a3238302c746f703a31302c7d293b77696e2e616464286232293b76617220617368703d54692e55492e6372656174654c6162656c287b636f6c6f723a2723303030272c746578743a275265706f727420746f20415348503a272c746f703a31302c6c6566743a31302c77696474683a276175746f272c6865696768743a276175746f277d293b77696e2e6164642861736870293b7661722062333d54692e55492e637265617465427574746f6e287b7469746c653a27447275672053686f7274616765205265706f727420466f726d272c6865696768743a34302c77696474683a3238302c746f703a31302c7d293b77696e2e616464286233293b62312e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28290a7b76617220656d61696c4469616c6f673d54692e55492e637265617465456d61696c4469616c6f6728293b656d61696c4469616c6f672e7375626a6563743d22447275672053686f7274616765205265706f7274223b656d61696c4469616c6f672e746f526563697069656e74733d5b276472756773686f727461676573406664612e6868732e676f76275d3b656d61696c4469616c6f672e6f70656e28293b7d293b62322e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28290a7b54692e506c6174666f726d2e6f70656e55524c282774656c3a3838383436333633333227293b7d293b62332e6164644576656e744c697374656e65722827636c69636b272c66756e6374696f6e28290a7b54692e506c6174666f726d2e6f70656e55524c2827687474703a2f2f7777772e617368702e6f72672f4472756753686f7274616765732f5265706f72742f27293b7d293b") forKey:@"main_windows/report_js"];
     }
     return [map objectForKey:path];
}

@end
