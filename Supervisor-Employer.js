// Supervisor/ Employer
intent("What (does| can|) (this|alan|) do?", 
       reply("You can assign tasks or create groups with just your voice."));
intent("(Hello|Hi|hey|)", 
      reply("Hello"));

intent("(Join|add|I would like to join|) a group", p => {
    p.play("what is your code?");
    p.then(addGroupCode);
});

// six digit letter + number codes
var groupCodes = "xcx123|123123|IT_DEP|345 f f g~marketing|1 2 3 1 2 3~Developer Team| test |Aakbutx1jBolxVEJKGtZ|CLCkenYfJ3WW4CxzVAVj|LSRm9yasIxyVVPAHzNzQ|O9XMjJnv9TKwkyBMRpaF|Vg7o7g2k4GXueUdD6vmh|YYgKTvhcgp9eRMRIcsSL|dgvZWqexp6PgHZaSNYpX|eF92gEqPmK0koonzcxBz|fiPnKtjLRwWBl4IrculL|gXQruAFN48WkIsV2dMXJ|kHM4bTiJ1Rs03QT7hxEC|o15vMZuwl4lZLokMq3N0|xnQZPmdHO05QefWwVejP|zIqKBXtQOgTJugUM83mY|1PubH0vcH2Pgwn2MiszK|1g8FFjtLSe7bytTtEbT5|92yd0mnx6d8oXlOJH5G2"; // will likely ignore in the future

var addGroupCode = context(() => {
    intent(`$(T ${groupCodes})`, p => {
        if(p.T.value === "test"){
             p.play(`test complete`);
        }
        p.play(`joined (group|the|) ${p.T.label}`);
        //@ add flutter stuff
    });
});
var groupsList = "software engineers|marketing|all emloyees|IT_DEP"  //can be appended in the future
 // assign a task // // (More step possibility)
//
intent("(add|create|append|) (a|a new|) task", p => {
    p.play("to which group would you like to addign the task to?");
    p.then(groupProcess);
    // @add flutter stuff
});

var groupProcess = context(() => {
    intent(`$(T ${groupsList})`, p => {
        p.then(taskProcess)
        // @add flutter stuff
    } );
});
var taskProcess = context(() => {
    intent(` $(TASK* (.*))`, p => {
        //@add flutrer stuff
    });
});
/*
intent(`create task testing`, p => {
    p.play( {command: 'createTask'});
});
*/
// More convenient  //////////////////////////////////////////////////
// other task route 
intent("(add|create|append|) (a|a new|) task", p => {
    p.play("state group and task");
    p.then(gnTask);
    // @add flutter stuff
});
var task;
var groupName;

var gnTask = context(() => {
    intent(`$(T ${groupsList}), $(TASK* (.*))`, p => {
       
       //p.play(`Registered, assigned: ${p.TASK.value} to ${p.T.value}`);
       task = p.TASK.value;
       groupName = p.T.value;
      // p.play("would you like to set a deadline?");
      // p.then(dateConfirm);
          

      
     p.play( {command: 'createTask', task: p.TASK.value, groupName: p.T.value});
    });
});

var negativeRes = "no|no thanks| no thank you|No|just send|no date|send task"
// checks for date or voice conclusion
var dateConfirm = context(() => {
    console.log("ran");
   intent(`$(DATE)`, p => {
       
        let res = p.DATE.moment.format("dddd, MMMM Do YYYY");
        p.play( {command: 'createTask', task: task, groupName: groupName, date: res});
 
        
    }); 
});


// mark task as complete // in future might make seperate delete task feature
intent(`(Mark|delete task| edit state of |completed task|completed) $(TASK* (.*))`, p => {
    p.play("Task done");
    console.log(`Task: ${p.TASK.value}`);
    // @ add flutter command stuff
});
/*
// read tasks 
intent("(read|what are my| state| list|what do i have to do|) task_", p => {
    // @ communicate with flutter data to list
    p.play(`Your tasks are: `);
});
*/

//read groups
intent("(what are|read|read my| read the|tell me| show| list|list all|what are my|what) groups", p => {
    p.play(`Here are your groups:`);
    p.play( {command: 'readGroups'});
});

// create Group
intent("create a (group|new group|)", p => {
    p.play("Name of group?");
    p.then(groupCreate);
});

var groupCreate = context(() => {
    /*
    intent(`$(GROUP* (.*))`, p => {
        p.play(`Group: ${p.GROUP.value} has been created`)
        p.play( {command: 'createGroup', groupName: p.GROUP.value})
    });
    */
});

intent("(sign out|log out|log me out|)", p => {
    p.play( {command: 'signOut'});
});
     

// below = code from cazzer
intent('(enter|open|enter my| open main|) group', p=> {
    p.play("okay, showing IT_Dep");
    p.play({command: "enterGroup", "groupName": "IT_Dep"});
});
intent('(read|what are my| read my|) tasks', p => {
    p.play("okay, reading tasks for this group");
    p.play({command: "readTasks", "groupName": "IT_Dep"})
});

