<div class="block_lab_inp">
    <span class="lab_def">Subject</span>
    <div class="inp_def">
        <div class="select_nei">
            <span class="h_select_nei"><span></span><b class="subject_value">Pick your topic from the list</b></span>
            <input type="hidden" />
            <div class="drop_menu_select">
                <span class="top_whi"></span>
                <ul>
                    <li val="1"><%= translations.choice1 %></li>
                    <li val="2"><%= translations.choice2 %></li>
                    <li val="3"><%= translations.choice3 %></li>
                    <!--li val="4"><%= translations.choice4 %></li>
                    <li val="5"><%= translations.choice5 %></li>
                    <li val="5"><%= translations.choice6 %></li>
                    <li val="5"><%= translations.choice7 %></li-->
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="block_lab_inp">
    <span class="lab_def">Title</span>
    <div class="inp_def"><input type="text" name="title" dataholder="Enter subject" /></div>
</div>
<div class="block_lab_inp">
    <span class="lab_def">Message</span>
    <div class="def_textarea"><textarea name="message" dataholder="Enter message..."></textarea></div>
</div>
<div class="line_form_sbts">
    <div class="sbt_rig">
        <input type="button" value="SUBMIT" class="sbt_style" />
    </div>
    <div class="def_che"><input type="checkbox" name="copy" id="1" class="styled" checked="checked" /><label for="1">Send me a copy</label></div>
</div>