import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  // din kode her
  constructor() {
    super();
    
    //console.log(this.user);
  }

  changeUsername(e){
    this.user.uname = e.srcElement.value;
  }
  changeFirstname(e){
    this.user.firstName = e.srcElement.value;
  }
  changeLastname(e){
    this.user.lastName = e.srcElement.value;
  }

  async submit(e) {
    e.preventDefault(this.user);
    console.log(this.user);

    fetch('api/updateUser.php', {
      method: 'PUT',
      body: this.user,
     }).then(res=>res.json())
       .then(data=>{
         if (data.status=='success') {
             console.log("Updated");
         } else {
             console.log("Error");
         }
       })
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <form 							
      @submit="${(e) => {
        this.submit(e);
      }}">

       <div class="form-group">
       <label class="form-check-label" for="username">Username/Email</label>
        <input
        class="form-control"
        id="username"
        type="email"
        value="${this.user.uname}"
        @change="${(e) =>
          this.changeUsername(e)}"
        required>
        
       </div>
     

       <div class="form-group">
        <label class="form-check-label" for="firstname">Firstname</label>
          <input
          class="form-control"
          id="firstname"
          value="${this.user.firstName}"
          @change="${(e) =>
            this.changeFirstname(e)}"
          required>
        </div>

   

        <div class="form-group">
          <label class="form-check-label" for="lastname">Lastname</label>
          <input
          class="form-control"
          id="lastname"
          value="${this.user.lastName}"
          @change="${(e) =>
            this.changeLastname(e)}"
          required>
        </div>

      
        <div class="form-group">
        <input
        class="form-control"
        type="submit"
        value="Edit user"
        />
        </div>

      </form>
    `;
  }
  

}
customElements.define('edit-user', EditUser);
