<span class="subh_some_error"><%= confirmationTitleMessage %></span>
<span class="subp_some_error"><%= confirmationBodyMessage %></span>
<% if (cancelButton) { %>
	<div class="two_btns">
		<a class="btn_popup btn_popup_confirm"><%= confirmButton %></a>
		<a class="btn_popup btn_popup_cancel normal_weight">CANCEL</a>
	</div>
<% } else { %>
	<div class="only_ok">
		<a class="btn_popup btn_popup_confirm"><%= confirmButton %></a>
	</div>
<% } %>