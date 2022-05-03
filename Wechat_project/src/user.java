import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.Map;

public class user extends HttpServlet {
    public LinkedList user=new LinkedList();
    //预约园区
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("conntent success by user");
        //身份证号：in 三个预约地点的预约情况：r1，r2，r3
        String in=null;
        int r1=0,r2=0,r3=0;
        //接收
        Map map = req.getParameterMap();//map集合 存储前端数据
        Gson gson = new Gson();//工具类Gson@google 可以把map数组转换为字符串或json
        String mapJsonString = gson.toJson(map);//将数据转化为字符串
//        System.out.println(mapJsonString);//输出转化后的字符串
        if(!map.isEmpty()){//判断传参非空
            map.forEach((key, value) -> {
                String mapJsonStrings = gson.toJson(value);//将数据转化为字符串
                user.add(delstr(mapJsonStrings));//格式化参数 存储到buy链表
            });
            //为数据库所需数据传参
            for(int m=0;m<user.size();m++){
            //    System.out.println("mes:"+user.get(m));
                System.out.println(r1+"-"+r2+"-"+r3);
                if(user.get(m).equals("\"��ɽ\"")){r1=1;}//第一个值
                if(user.get(m).equals("\"�﷿\"")){r2=1;}//第二个值
                if(user.get(m).equals("\"�����\"")){r3=1;}//第三个值
            }
        }else{
            System.out.println("null!please restart!");
        }
        try {
            resp.getWriter().write(toSQL(in,r1,r2,r3));//返回给前端 购买结果
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //向数据库注入
    //需要输入的数据：身份证号：in 三个预约地点的预约情况：r1，r2，r3
    public String toSQL(String in,int r1,int r2,int r3) throws Exception {
        //注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //连接数据库
        String url = "jdbc:mysql://localhost:3306/wechat";
        Connection c = DriverManager.getConnection(url, "root", "123456");
        //检索reserve表 查找用户是否已经使用该身份证购票
        String sql1 = "select identification_number from reserve where identification_number=" + in+";";
        PreparedStatement ps1 = c.prepareStatement(sql1);
        ResultSet rs1 = ps1.executeQuery();
        System.out.println("success-1!");
        int k1 = 0;
        while (rs1.next()) {
            k1++;
        }
        if(k1!=0){
            //已购票
            //检索bookzoo表 查找该身份证的预约情况
            String sql2 = "select r1,r2,r3 from bookzoo where identification_number=" + in+";";
            PreparedStatement ps2 = c.prepareStatement(sql2);
            ResultSet rs2 = ps2.executeQuery();
            System.out.println("success-2!");
            ps1.close();
            //判断返回的身份证是否存在预约情况
            int k2 = 0;
            while (rs2.next()) {
                k2++;
            }
            if (k2 == 0) {
                //不存在预约情况，将预约信息输入到bookzoo
                String sql3 = "insert into bookzoo values ("+in +","+r1+","+r2+","+r3+")"+";";
                PreparedStatement ps3 = c.prepareStatement(sql3);
                ps3.executeUpdate();
                System.out.println("success-3!");
                ps3.close();
            } else {
                return "done!";
            }
            ps2.close();
        }else{

        }
        ps1.close();
        return "success!";
    }
    public String delstr(String str) {
        //需要删除的字符串
        int st = 0;
        int len = str.length();
        char[] val = str.toCharArray();
        char[] c1 =new char[val.length-4];
        int k=0;
        for(int i=2;i<val.length-2;i++) {
            c1[k] = val[i];
            k++;
        }
        String over=String.valueOf(c1);
        System.out.println("new:"+over);
        return(over);
    }
}
