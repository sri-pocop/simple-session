var options_manager =
        [
        {
            "text"  : "",
            "value" : ""
        },
        {
            "text"  : "Murugavel Ramachandran",
            "value" : "murugavel.r"
        },
        {
            "text"     : "Somasundaram R",
            "value"    : "somasundaram.r",
        },
        {
            "text"  : "Abdul Rahuman K",
            "value" : "Abdul.r"
        }
        ];
var options_lead =
        [
        {
            "manager" : "murugavel.r",
            "text"  : "Anitha Rajendran",
            "value" : "anitha.r"
        },
        {
            "manager" : "murugavel.r",
            "text"     : "Komathi M",
            "value"    : "komathi.m",
        },
        {
            "manager" : "murugavel.r",
            "text"     : "Subburaj S",
            "value"    : "subburaj.s",
        },
        {
            "manager" : "somasundaram.r",
            "text"  : "Soma Lead 1",
            "value" : "soma1"
        },
        {
            "manager" : "somasundaram.r",
            "text"  : "Soma Lead 2",
            "value" : "soma2"
        },
        {
            "manager" : "Abdul.r",
            "text"  : "abdul Lead 1",
            "value" : "abdul1"
        },
        {
            "manager" : "Abdul.r",
            "text"  : "abdul Lead 2",
            "value" : "abdul2"
        },
        {
            "manager" : "Abdul.r",
            "text"  : "abdul Lead 3",
            "value" : "abdul3"
        }
        ];

var questions =
        [
        {
            "question"  : "Application Details",
            "section" : "1"
        },
        {
            "question"  : "Team Details",
            "section" : "2"
        },
        {
            "question"  : "Audit Details",
            "section" : "3"
        }
        ];
var questions_list =
        [
        {
            "section"  : "1",
            "sub_question" : "Backup of Application Codes Done?"
        },
        {
            "section"  : "1",
            "sub_question" : "Backup of Application Codes on Daily Basics?"
        },
        {
            "section"  : "2",
            "sub_question" : "Does All Team Members are billable?"
        },
        {
            "section"  : "2",
            "sub_question" : "Does everybody are filling Time sheet?"
        },
        {
            "section"  : "3",
            "sub_question" : "All observation cleared for last Audit?"
        },
        {
            "section"  : "2",
            "sub_question" : "Is there any issues with team Members?"
        }
        ];
    
    function manager_change_function(manager_selected)
        {
            $("#lead_selection").empty();
            for(var i = 0, l = options_lead.length; i < l; i++)
                {   
                    var option = options_lead[i];
                    if(option.manager==manager_selected)
                       { selectBox_lead.options.add( new Option(option.text, option.value) );}
                }   
        }
    function inp( f_n , f_i , p = 0)
        {
            if(p == 1)
            {
                return "<input type='checkbox'  onchange='tick(this.id)' class='label-text' onclick='get_results()' name='" + f_n + "' id='" + f_i + "'>";
            }
            else
            {
                return "<input type='checkbox' onchange='tick_radio(this.id,this.checked)' onclick='get_results()' name='" + f_n + "' id='" + f_i + "'>";
            }
            
        }
    function com( f_n )
        {
            return "<input type='text' name='" + f_n + "'>";
            
        }
    function tick(t_id)
        {
            
            function radio_sel(id)
            {
                document.getElementById(id).checked  =true;
            }
            function radio_sel_opp(id)
            {
                document.getElementById(id).checked  =false;
            }

            let t=t_id.substring(0,t_id.length-8);
            let res = t_id.substring( 7, 8 );
            let y_n = t_id.substring( 11, 12 );
            let y_n_opposite = y_n == "y" ? "n" : "y";
            let y = t + y_n_opposite + "_master";
            document .getElementById(y).checked = false;
            // alert(y);
            let count=0;
            for(var j = 0, li = questions_list.length; j < li; j++)
            {
                let opt = questions_list[j];
                if(opt.section == res)
                {
                    count++;
                }
            }
            // alert(count);
            for ( var p=1; p<=count ;p++)
            {
                let temp_id= "choice_" + res + "_" + p + "_" + y_n;
                radio_sel(temp_id);
                let temp_id_opp= "choice_" + res + "_" + p + "_" + y_n_opposite;
                radio_sel_opp(temp_id_opp);
            }

        }
    function tick_radio(t_id,t_value)
    {
        let t = t_id.substring(0,t_id.length-3);
        let y_n = t_id.substring( 11, 12 );
        let y_n_opposite = y_n == "y" ? "n" : "y";
        let t1 = t + "1_" + y_n_opposite + "_master";
        let t1_own = t + "1_" + y_n + "_master";
        let t2 = t_id.substring(0,t_id.length-1) + y_n_opposite;
        document.getElementById(t1).checked  =false;
        document.getElementById(t2).checked  =false;
        if(t_value)
        {}
        else{
            document.getElementById(t1_own).checked  =false;
        }
        // alert(document.getElementById("choice_1_1_n").checked);
        // alert(t_value);
    }
    function get_results()
    {
        $(document).ready(function()
        {
        var reslt = 0;
        for(var i = 0, l = questions.length; i < l; i++)
                {
                    t=1;
                    tot_questions=0;
                    var option = questions[i];
                                        
                    for(var j = 0, li = questions_list.length; j < li; j++)
                    {
                        var option_l = questions_list[j];
                        tot_questions+=1;
                        if(option.section == option_l.section)
                        {
                            var choice_name="choice_" + option.section + "_" + t;
                            var choice_id_y="choice_" + option.section + "_" + t +"_y";
                            
                            let_temp_res = document.getElementById(choice_id_y).checked?1:0;
                            
                            if(let_temp_res==1)
                            {
                                reslt+=1;
                            }
                            // alert(let_temp_res);
                            t++;
                        }
                        
                    }
                }
                document.getElementById("result_score").innerHTML = reslt + "/" + tot_questions;
        })
    }
    