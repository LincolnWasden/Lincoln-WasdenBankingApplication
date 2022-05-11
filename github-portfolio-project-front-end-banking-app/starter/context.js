const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);



function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }

  


  function Withdraw(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [withdraw, setWithdraw]   = React.useState('');
    const [balance, setBalance]  = React.useState('1000');
    const [disabled, setDisabled] = React.useState(true);
    const ctx = React.useContext(UserContext); 

    //var ctx2 = Array(ctx); 
  
    const validate = amount => {
      if(!amount) {
        setStatus('Error: Please enter a value');
        return false;
      }
      if(!Number(amount)) {
        //(amount === NaN) doesnt work
        setStatus('Error: Numerical values only');
        return false;
      }
      if(amount < 0) {
        setStatus("Error: Cannot deposit a negative amount");
        return false;
      }
      if(balance - amount < 0){
        setStatus('Error: You are not that Rich')
        return false;
      }
      return true;
    }
  
    let withdrawMoney = amount => {
      if (!validate(amount)) return;
      setBalance(Number(balance) - Number(amount));
      setShow(false);
      setStatus('');
      ctx.users.push(Number(balance) - Number(amount));
    }
  
    //function handleCreate(){
      //console.log(deposit);
       //if (!validate(deposit,     'deposit'))     return;
      //ctx2.push({deposit});
      //setShow(false);
      //console.log(ctx2);
      //console.log(this.ctx2[0]);
      //let newbalance = parseInt(deposit) + Number(ctx2.balance);
      //console.log(newbalance); 
      //return deposit;
       // }    
  //console.log(handleCreate());
  
    function clearForm(){
      setWithdraw('');
      setShow(true);
    }
  
    React.useEffect(() => {
      if (!withdraw) {
        setDisabled(true);
      }
      else {
        setDisabled(false);
      }
    }, [withdraw]);
  
    return (
      <Card
        bgcolor="primary"
        header="Withdraw"
        status={status}
        body={show ? (  
                <>
                <h5>Balance: ${balance}</h5>
                <br/>
                Withdraw Amount<br/>
                <input type="withdraw" className="form-control" id="withdraw" placeholder="Withdraw Amount $" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={() => withdrawMoney(withdraw)} disabled={disabled}>Withdraw</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Take more money out?</button>
                </>
              )}
      />
  
  
    )
  }


  function Deposit(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [deposit, setDeposit]   = React.useState('');
     const [balance, setBalance]   = React.useState('1000');
     const [disabled, setDisabled] = React.useState(true);
    const ctx = React.useContext(UserContext); 
    //var ctx2 = Array(ctx); 
  
    const validate = amount => {
      if(!amount) {
        setStatus('Error: Please enter a value');
        return false;
      }
      if(!Number(amount)) {
        //(amount === NaN) doesnt work
        setStatus('Error: Numerical values only');
        return false;
      }
      if(amount < 0) {
        setStatus("Error: Cannot deposit a negative amount");
        return false;
      }
      return true;
    }
  
    let depositMoney = amount => {
      if (!validate(amount)) return;
      setBalance(Number(balance) + Number(amount));
      setShow(false);
      setStatus('');
      ctx.users.push(Number(balance) + Number(amount));
    }
  
    //function handleCreate(){
      //console.log(deposit);
       //if (!validate(deposit,     'deposit'))     return;
      //ctx2.push({deposit});
      //setShow(false);
      //console.log(ctx2);
      //console.log(this.ctx2[0]);
      //let newbalance = parseInt(deposit) + Number(ctx2.balance);
      //console.log(newbalance); 
      //return deposit;
       // }    
  //console.log(handleCreate());
  
    function clearForm(){
      setDeposit('');
      setShow(true);
    }
  
    React.useEffect(() => {
      if (!deposit) {
        setDisabled(true);
      }
      else {
        setDisabled(false);
      }
    }, [deposit]);
  
    return (
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={show ? (  
                <>
                <h5>Balance: ${balance}</h5>
                <br/>
                Deposit Amount<br/>
                <input type="deposit" className="form-control" id="deposit" placeholder="Deposit Amount $" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={() => depositMoney(deposit)} disabled={disabled}>Deposit</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit?</button>
                </>
              )}
      />
    )
  }