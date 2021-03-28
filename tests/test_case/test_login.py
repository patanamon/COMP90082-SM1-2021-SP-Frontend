
import os,sys
import unittest
from time import sleep
import ddt
from selenium import webdriver
current_directory = os.path.dirname(os.path.abspath(__file__))
root_path = os.path.abspath(os.path.dirname(current_directory) + os.path.sep + "./")
print(current_directory)
print(root_path)
sys.path.append(root_path)
from readYAML import GetYaml

file = os.path.join(os.path.dirname(__file__) + '/../data/', 'login.yml')
yaml_data = GetYaml(file)
result = yaml_data.get_data()
test_pass = result['pass']
test_fail = result['fail']


@ddt.ddt
class ForTest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        unittest.TestCase.__init__(self, *args, **kwargs)

    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/')

    def tearDown(self) -> None:
        # time.sleep(3)
        self.driver.quit()

    # @unittest.skip('skip')
    def test_Login_button(self):
        login_button = 'LOGIN'
        login_button_path = '//a[@class="button cta" and text()="Login"]'

        # check login button text
        self.assertEqual(self.driver.find_element_by_xpath(login_button_path).text, login_button,
                         "The login button text displays incorrectly")

    # @unittest.skip('skip')
    @ddt.data(*test_pass)
    def test_login_pass(self, yaml_data):
        # Read test data
        print('test case: %s' % yaml_data['test_name'])
        print('username: %s; password: %s' % (yaml_data['username'], yaml_data['password']))
        username = yaml_data['username']
        pwd = yaml_data['password']

        # init xpath
        login_button_path = '//a[@class="button cta" and text()="Login"]'
        input_path = '//input[@class="form-control" and @name="{name}"]'

        # enter username, pwd and click login button
        username_path = input_path.format(name='username')
        pwd_path = input_path.format(name='password')
        self.driver.find_element_by_xpath(username_path).send_keys(username)
        self.driver.find_element_by_xpath(pwd_path).send_keys(pwd)
        self.driver.find_element_by_xpath(login_button_path).click()
        sleep(1)
        self.driver.refresh()
        sleep(1)

        # Login is successful, confirm whether the page jumps normally

        get_title = self.driver.find_element_by_xpath('//*[@id="title"]').text
        title = 'Coordinator Homepage'
        self.assertEqual(get_title, title, 'Successful login, failed to jump to Home (C)')

    @unittest.skip('skip')
    @ddt.data(*test_fail)
    def test_login_fail(self, yaml_data):
        # Read test data
        print('test case: %s' % yaml_data['test_name'])
        print('username: %s; password: %s' % (yaml_data['username'], yaml_data['password']))
        username = yaml_data['username']
        pwd = yaml_data['password']
        username_help_block = yaml_data['username-help-block']
        password_help_block = yaml_data['password-help-block']

        # init xpath
        login_button_path = '//a[@class="button cta" and text()="Login"]'
        input_path = '//input[@class="form-control" and @name="{name}"]'
        # enter username, pwd and click login button
        username_path = input_path.format(name='username')
        pwd_path = input_path.format(name='password')

        self.driver.find_element_by_xpath(username_path).send_keys(username)
        self.driver.find_element_by_xpath(pwd_path).send_keys(pwd)
        self.driver.find_element_by_xpath(login_button_path).click()
        sleep(1)

        if (username_help_block != ''):
            self.driver.find_element_by_xpath(
                '//*[@class="help-block" and text()="{block}"]'.format(block=username_help_block)).is_displayed()

        if (password_help_block != ''):
            self.driver.find_element_by_xpath(
                '//*[@class="help-block" and text()="{block}"]'.format(block=password_help_block)).is_displayed()


if __name__ == '__main__':
    unittest.main()
